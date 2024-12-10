import UserService from "../../services/user/userServices";
import { Request, Response } from "express";
import { getServerSession } from "next-auth";
import OtpUtility from "../../utils/otpUtility";
import MailUtility from "../../utils/mailUtility";
import { UserType } from "../../model/user/userModel";
import JwtUtility from "../../utils/jwtUtility";
import PasswordUtils from "../../utils/passwordUtils";
class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  async signupPost(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body;

      if (!user.email || !user.password) {
        res.status(400).json({ message: "Email and password are required." });
        return;
      }

      const existingUser = await this.userService.findByEmail(user.email);

      if (existingUser) {
        if (existingUser.status === 0) {
          const otp = await OtpUtility.otpGenerator();
          try {
            await MailUtility.sendMail(user.email, otp, "Verification OTP");
            res
              .status(200)
              .json({
                message: "OTP resent to the email.",
                email: user.email,
                otp,
              });
          } catch (mailError) {
            console.error("Failed to resend OTP:", mailError);
            res
              .status(500)
              .json({ message: "Failed to send verification email." });
          }
          return;
        } else {
          // If status is not 0, user already exists
          res.status(409).json({ message: "User already exists." });
          return;
        }
      }

      // Create new user
      user.password = await PasswordUtils.passwordHash(user.password);
      const newUser = await this.userService.createUser(user);

      const otp = await OtpUtility.otpGenerator();
      try {
        await MailUtility.sendMail(user.email, otp, "Verification OTP");
        res.status(200).json({
          message: "OTP sent to the email.",
          email: user.email,
          otp,
        });
      } catch (mailError) {
        console.error("Failed to send OTP:", mailError);
        res.status(500).json({ message: "Failed to send verification email." });
      }
    } catch (err: any) {
      console.error("Error during signup:", err);
      res
        .status(500)
        .json({ message: `Error while adding user: ${err.message}` });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    const { otp, storedOTP, storedEmail } = req.body;
    if (!otp) {
      res.status(400).json({ message: "OTP is required" });
      return;
    }

    if (!otp || !storedOTP || !storedEmail) {
      res.status(400).json({ message: "OTP Timeout. Try again" });
      return;
    }
    if (storedOTP === otp) {
      const currentUser = await this.userService.getUserByEmail(storedEmail);
      if (!currentUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const userData: UserType = { ...currentUser.toObject(), status: 1 };
      const updateUser = await this.userService.updateUser(
        storedEmail,
        userData
      );

      if (updateUser) {
        res
          .status(200)
          .json({ message: "OTP verified successfully", user: updateUser });
      } else {
        res.status(500).json({ message: "Error updating user data" });
      }
    } else {
      res.status(400).json({ message: "Incorrect OTP. Please try again" });
    }
  }

  async loginPost(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({
          success: false,
          message: "Email and password required",
          data: null,
        });
      return;
    }

    try {
      const existUser = await this.userService.getUserByEmail(email);
      if (!existUser) {
        res
          .status(401)
          .json({
            success: false,
            message: "User not found. Please sign up.",
            data: null,
          });
        return;
      }

      if (!existUser.password) {
        res
          .status(403)
          .json({
            success: false,
            message: "Password not set for this account",
            data: null,
          });
        return;
      }

      if (!existUser.status) {
        res
          .status(403)
          .json({ success: false, message: "Account is blocked", data: null });
        return;
      }

      const comparePassword = await PasswordUtils.comparePassword(
        password,
        existUser.password
      );

      if (!comparePassword) {
        res
          .status(401)
          .json({
            success: false,
            message: "Invalid email or password",
            data: null,
          });
        return;
      }

      const accessToken = JwtUtility.generateAccessToken({
        email: email,
        id: existUser._id,
      });
      const refreshToken = JwtUtility.generateRefreshToken({
        email: email,
        id: existUser._id,
      });

      res.cookie("userRefreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 60 * 60 * 1000,
      });

      const filteredData = {
        id: existUser._id,
        email: existUser.email,
      };

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: { accessToken, refreshToken, user: filteredData },
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to login. Please try again later.",
        data: null,
      });
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    if (!email) {
      res
        .status(400)
        .json({ status: false, messgae: "email is empty try again" });
      return;
    }
    const getUserData = await this.userService.findByEmail(email);
    if (!getUserData) {
      res
        .status(400)
        .json({ status: false, messgae: "user not found. please signup" });
      return;
    } else if (getUserData.status !== 1) {
      res
        .status(400)
        .json({ status: false, messgae: "Your account is blocked." });
      return;
    }
    const otp = await OtpUtility.otpGenerator();
    const generateEmail = await MailUtility.sendMail(
      email,
      otp,
      "Password Reset"
    );
    if (generateEmail) {
      res
        .status(200)
        .json({
          status: true,
          message: "An OTP is send to your email",
          data: { email, otp },
        });
      return;
    } else
      res
        .status(400)
        .json({
          status: false,
          messgae: "not able to generate OTP. Please try again",
        });
  }

  async updatePassword(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ status: false, message: "invalid credentails" });
      return;
    }
    try {
      const existUser = await this.userService.getUserByEmail(email);
      if (!existUser) {
        res
          .status(400)
          .json({ status: false, message: "user not exist. please signup" });
        return;
      } else if (existUser.status !== 1) {
        res.status(403).json({ status: false, message: "user is blocked" });
        return;
      }
      const hashPassword = (await PasswordUtils.passwordHash(
        password
      )) as string;
      const data = { password: hashPassword } as UserType;
      const updateUser = await this.userService.updateUserById(
        existUser._id as string,
        data
      );
      if (updateUser)
        res
          .status(200)
          .json({ status: true, message: "password updated sucessfully" });
      else
        res
          .status(400)
          .json({ status: false, message: "unable to update password" });
    } catch (error) {
      console.log("error while updating password", error);
      res
        .status(500)
        .json({ status: false, message: "error while updating password" });
    }
  }
  async googleSinup(req: Request, res: Response): Promise<void> {
    const { name, email, image } = await req.body;
    
    if (!email) {
      res.status(400).json({ status: false, message: "invalid email id " });
      return;
    } 
    try {
      let userData = await this.userService.findByEmail(email)
    if(!userData){
    const data =  {email, first_name:name, profilePicture:image, status:1} as UserType
     userData =  await this.userService.createUser(data)
    }
    const accessToken = JwtUtility.generateAccessToken({
      email: email,
      id: userData._id,
    });
    const refreshToken = JwtUtility.generateRefreshToken({
      email: email,
      id: userData._id,
    });

    res.cookie("userRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 60 * 60 * 1000,
    });
    res.status(200).json({status:true, message:"signup successfull", data:{userData,token: accessToken}})
    } catch (error) {
      console.log("error occured during creating user", error)
      res.status(500).json({status:false, message:"unable to signup. Try again"})
    }
  }
}

export default UserController;
