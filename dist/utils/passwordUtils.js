"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class PasswordUtils {
    static async passwordHash(password) {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashpassword = await bcryptjs_1.default.hash(password, salt);
        return hashpassword;
    }
}
exports.default = PasswordUtils;
