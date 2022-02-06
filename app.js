const express = require('express')
const { sequelize } = require('./models');
const path = require('path');
const app = express()
const cors = require('cors');
const http = require('http');
const jwt = require('jsonwebtoken');
const func = require('joi/lib/types/func');
const { Server } = require("socket.io");
const history = require('connect-history-api-fallback');
require('dotenv').config();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://gagrica-app.herokuapp.com',
        
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
appCrud.use(cors(corsOptions));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null)  return res.status(400).json({ msg: "Unauthorized"});
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.status(401).json({ msg: "Invalid token"});
        
        req.user = user;
    
        next();
    });
}




app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

 app.get('/login', (req, res) => {
     res.sendFile('login.html', { root: './static' });
 });

 app.get('/', (req, res) => {

    res.sendFile('index.html', { root: './dist' });
});



app.post('/',authToken, (req, res) => {

});

app.get('/moderator', (req, res) => {

    res.sendFile('indexModerator.html', { root: './static' });
});


//app.use(express.static(path.join(__dirname, 'static')));
const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({ index: './dist/index.html' }));

app.use(staticMdl);

// app.listen({ port: process.env.PORT || 8000 }, async () => {
//     console.log('Pokrenut je aplikacioni servis')
//     await sequelize.authenticate();
// });
server.listen({ port: process.env.PORT || 9000 }, async () => {
    await sequelize.authenticate();
});