"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../../model/user/userModel");
class UserRepositoryImplementation {
    async createUser(user) {
        const newUser = await userModel_1.User.create(user);
        return newUser;
    }
}
exports.default = UserRepositoryImplementation;
