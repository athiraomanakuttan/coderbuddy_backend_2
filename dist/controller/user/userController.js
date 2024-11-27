"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordUtils_1 = __importDefault(require("../../utils/passwordUtils"));
const otpUtility_1 = __importDefault(require("../../utils/otpUtility"));
const mailUtility_1 = __importDefault(require("../../utils/mailUtility"));
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async signupPost(req, res) {
        try {
            const user = req.body;
            if (!user.email || !user.password)
                res.status(400).json({ message: "Email and password are required." });
            const existingUser = await this.userService.findByEmail(user.email);
            console.log("'user data", existingUser);
            if (existingUser)
                res.status(200).json({ message: "user already exist" });
            else {
                user.password = await passwordUtils_1.default.passwordHash(user.password);
                const newUser = await this.userService.createUser(user);
                if (newUser) {
                    const otp = await otpUtility_1.default.otpGenerator();
                    if (!req.session) {
                        res.status(500).json({ message: "Session not initialized." });
                        return;
                    }
                    console.log("session");
                    console.log(req.session);
                    const mailsend = await mailUtility_1.default.sendMail(user.email, otp, "Verification OTP");
                    console.log(mailsend);
                    req.session.OTP = otp;
                }
                res.status(201).json({ message: "user created successfully", newUser });
            }
        }
        catch (err) {
            res.status(500).json({ message: `error while adding ${err}` });
        }
    }
}
exports.default = UserController;
