"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(user) {
        const newUser = await this.userRepository.createUser(user);
        return newUser;
    }
}
exports.default = UserService;
