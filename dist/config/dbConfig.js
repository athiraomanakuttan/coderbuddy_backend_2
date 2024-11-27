"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDb = async () => {
    const connection_string = process.env.DB_CONNECTION_STRING;
    try {
        const connection = await mongoose_1.default.connect(`${connection_string}`, {
            dbName: 'coderbuddy'
        });
        console.log("db connected successfully");
    }
    catch (error) {
        console.log("eroor connecting db", error);
    }
};
exports.default = connectDb;
