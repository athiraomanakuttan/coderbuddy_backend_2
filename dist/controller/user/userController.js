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
            if (!user.email || !user.password) {
                res.status(400).json({ message: "Email and password are required." });
                return;
            }
            const existingUser = await this.userService.findByEmail(user.email);
            if (existingUser) {
                res.status(409).json({ message: "User already exists." });
                return;
            }
            user.password = await passwordUtils_1.default.passwordHash(user.password);
            const newUser = await this.userService.createUser(user);
            if (newUser) {
                const otp = await otpUtility_1.default.otpGenerator();
                if (!req.session) {
                    res.status(500).json({ message: "Session not initialized." });
                    return;
                }
                req.session.OTP = otp;
                // req.session.email = user.email;
                try {
                    console.log("before");
                    const mailSend = await mailUtility_1.default.sendMail(user.email, otp, "Verification OTP");
                    console.log("after");
                    console.log(mailSend);
                }
                catch (mailError) {
                    res.status(500).json({ message: "Failed to send verification email." });
                    return;
                }
            }
            res.status(201).json({ message: "User created successfully", newUser });
        }
        catch (err) {
            console.error("Error during signup:", err);
            res.status(500).json({ message: `Error while adding: ${err.message}` });
        }
    }
}
exports.default = UserController;
