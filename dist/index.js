"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import cors from 'cors';
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/users/userRoutes"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const session = require('express-session');
require("./session.d");
(0, dbConfig_1.default)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
dotenv_1.default.config();
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
app.use(body_parser_1.default.json());
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
}));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/', userRoutes_1.default);
server.listen(process.env.PORT, () => console.log('server connected'));
