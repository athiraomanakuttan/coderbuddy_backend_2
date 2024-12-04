import UserService from "../../services/user/userServices";
import { Request, Response } from "express";
import PasswordUtils from "../../utils/passwordUtils";
import OtpUtility from "../../utils/otpUtility";
import MailUtility from "../../utils/mailUtility";
import { UserType } from "../../model/user/userModel";
import JwtUtility from "../../utils/jwtUtility";
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
      if (existingUser && existingUser.status===1) {
        res.status(409).json({ message: "User already exists." });
        return;
      }
      if(!existingUser){
        user.password = await PasswordUtils.passwordHash(user.password);
       const newUser = await this.userService.createUser(user);
      }
      
        const otp = await OtpUtility.otpGenerator();
        try {
          const mailSend = await MailUtility.sendMail(
            user.email,
            otp,
            "Verification OTP"
          );
          res.status(200).json({message : "otp send to the email", otp : otp, email: user.email});
        } catch (mailError) {
          res
            .status(500)
            .json({ message: "Failed to send verification email." });
          return;
        }
      
    } catch (err: any) {
      console.error("Error during signup:", err);
      res.status(500).json({ message: `Error while adding: ${err.message}` });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    const {otp,storedOTP,storedEmail} = req.body;
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
      const updateUser = await this.userService.updateUser(storedEmail, userData);

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
      res.status(400).json({success:false, message: "email and password required" , data:null});
      return;
    }
    try {
      const existUser = await this.userService.getUserByEmail(email);
      if (!existUser) {
        res.status(200).json({ success:false,message: "user not found. Please signup" , data : null });
        return;
      } else if (!existUser.password) {
        res.status(400).json({ success:false, message: "Password not set for this account", data : null  });
        return;
      }
      else if(!existUser.status){
        res.status(403).json({ success:false, message: "account is blocked", data : null  });
        return;
      }
      const comparePassword = await PasswordUtils.comparePassword(
        password,
        existUser.password
      );
      
      if (!comparePassword) {
        res.status(401).json({ success:false, message: "Invalid email or password" , data: null });
        return;
      }
      const accessToken = JwtUtility.generateAccessToken({ email: email,id:existUser._id});
      const refreshToken = JwtUtility.generateRefreshToken({ email: email,id:existUser._id});
      res.cookie("userRefreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1 * 60 * 60 * 1000,
      });
      const filteredData = {
        id:existUser._id,
        email:existUser.email,
      }
      res.status(200).json({ success:true, message:"login successfull",data:{accessToken, user:filteredData}})
    } catch (error) {
      res.status(500).json({success:false, message: "failed to login. Try again", data: {error} });
    }
  }
 
  
}

export default UserController;
