"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        message: "Email id required",
        unique: true
    },
    password: {
        type: String,
        required: true,
        message: "password is required",
    },
    qualification: [{
            qualification: {
                type: String
            },
            college: {
                type: String
            }
        }],
    address: {
        type: String,
    },
    experiance: {
        type: String
    },
    job_title: {
        type: String
    },
    occupation: {
        type: String
    },
    employer: {
        type: String
    },
    start_date: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    }
});
const User = (0, mongoose_1.model)('user', userSchema);
exports.User = User;
