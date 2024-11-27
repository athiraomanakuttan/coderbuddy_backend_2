import UserService from "../../services/user/userServices";
import { Request, Response } from "express";
import PasswordUtils from "../../utils/passwordUtils";
import OtpUtility from "../../utils/otpUtility";
import MailUtility from '../../utils/mailUtility'
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
                res.status(409).json({ message: "User already exists." });
                return;
            }
            user.password = await PasswordUtils.passwordHash(user.password);
            const newUser = await this.userService.createUser(user);
            if (newUser) {
                const otp = await OtpUtility.otpGenerator();
                if (!req.session) {
                    res.status(500).json({ message: "Session not initialized." });
                    return;
                }
                (req.session as any).OTP = otp;
                (req.session as any).email = user.email;
                try {
                    const mailSend = await MailUtility.sendMail(user.email, otp, "Verification OTP");
                    res.status(200).json("otp send to the email")
                } catch (mailError) {
                    res.status(500).json({ message: "Failed to send verification email." });
                    return;
                }
            }
        } catch (err: any) {
            console.error("Error during signup:", err);
            res.status(500).json({ message: `Error while adding: ${err.message}` }); 
        }
    }

}

export default UserController;
