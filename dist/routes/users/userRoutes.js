"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../../controller/user/userController"));
const userServices_1 = __importDefault(require("../../services/user/userServices"));
const userRepositoryImplemenatation_1 = __importDefault(require("../../repositories/implementation/user/userRepositoryImplemenatation"));
const userRepositoryImplementation = new userRepositoryImplemenatation_1.default();
const userService = new userServices_1.default(userRepositoryImplementation);
const userController = new userController_1.default(userService);
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => userController.signupPost(req, res));
exports.default = router;
