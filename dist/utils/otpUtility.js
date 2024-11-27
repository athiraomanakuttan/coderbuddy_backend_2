"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OtpUtility {
    static async otpGenerator() {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        return OTP;
    }
}
exports.default = OtpUtility;
