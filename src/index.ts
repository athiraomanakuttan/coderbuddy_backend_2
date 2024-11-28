import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import userRouter from './routes/users/userRoutes'
import connectDb from './config/dbConfig';
const session = require('express-session');
import cors from 'cors'


connectDb()
const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  }))
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/', userRouter);

server.listen(process.env.PORT, () => console.log('server connected'));
