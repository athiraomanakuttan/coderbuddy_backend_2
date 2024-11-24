import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import bodyParser  from 'body-parser'
import path from 'path'
const app = express()
const server = http.createServer(app)


app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


console.log(process.env.PORT)
server.listen(process.env.PORT,()=>console.log("server connected "))
