import { Request,Response } from "express"
import ExpertService from "../../services/expert/expertServices"
import { stat } from "fs";
import PasswordUtils from "../../utils/passwordUtils";
import JwtUtility from "../../utils/jwtUtility";
import { ExpertDocument } from "../../model/expert/expertModel";
import MailUtility from "../../utils/mailUtility";
import OtpUtility from "../../utils/otpUtility";

class ExpertController{
     private expertServece : ExpertService
    constructor(expertServece:ExpertService){
        this.expertServece = expertServece
     }

    async signupPost(req: Request, res: Response):Promise<void>{
        const { email, password} =  req.body;
        if(!email.trim() || !password.trim())
        {
            res.status(400).json({ status: false ,  message:"email or password isnot in required format", data: null})
            return;
        }
        const existExpert = await this.expertServece.getExpertByEmail(email)
        if(existExpert)
        {
            res.status(400).json({status: false ,  message:"user already exist. please signIn", data: null})
            return;
        }
        try {
            req.body.password =  await PasswordUtils.passwordHash(password)
            const createExpert= await this.expertServece.createExpert(req.body)
            if(createExpert)
            {
                const otp = await OtpUtility.otpGenerator()
                const emailSend = await MailUtility.sendMail(email,otp,"Verifivation OTP")
                res.status(200).json({status:true, message:"An otp has sent to your email", data : {otp,email}})
            }
            else
            res.status(200).json({status:false, message:"an unexpected error occured try again", data :null})
            
        } catch (error) {
            res.status(500).json({status: false, message:` some eroor occured:${error}`, data: null})
        }
     }

    async loginPost(req:Request , res:Response):Promise<void>{
        const {email,password} = req.body
        if(!email.trim() || !password.trim())
        {
            res.status(400).json({status:false, message:"email and password is not in required format",data:null});
            return;
        }
        const existExpert =  await this.expertServece.getExpertByEmail(email)
        if(!existExpert || !existExpert.password)
        {
            res.status(400).json({status:false, message:"user not found. please signup",data:null});
            return;
        }
        const checkPassword = await PasswordUtils.comparePassword(password,existExpert.password)
        if(!checkPassword)
        {
            res.status(400).json({status:false, message:"incorrect password",data:null});
            return;
        }
        else
        {
            const accessToken = JwtUtility.generateAccessToken({email})
            const refreshToken = JwtUtility.generateRefreshToken({email})
            res.cookie('refreshToken',refreshToken,{ 
                httpOnly: true,
                secure: false,
                sameSite: "none",
                maxAge: 1 * 60 * 60 * 1000,})

            res.status(200).json({status:true, message:"Login successfull",data:{accessToken,existExpert}});
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
          const currentUser = await this.expertServece.getExpertByEmail(storedEmail);
          if (!currentUser) {
            res.status(404).json({ message: "User not found" });
            return;
          }
    
          const userData: ExpertDocument = { ...currentUser.toObject(), status: 1 };
          const updateUser = await this.expertServece.updateExpert(currentUser._id, userData);
    
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
}

export default ExpertController