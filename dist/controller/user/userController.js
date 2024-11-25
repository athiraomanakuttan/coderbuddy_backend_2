"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async signupPost(user) {
        const newUser = await this.userService.createUser(user);
        return newUser;
    }
}
exports.default = UserController;
