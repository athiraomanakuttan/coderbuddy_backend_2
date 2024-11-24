const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/',(req,res)=> res.send("welcome"))
server.listen(process.env.PORT, () => console.log('server connected'));
