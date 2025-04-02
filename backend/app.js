const express = require('express');
const cors = require('cors');
const app = express();
const { db } = require('./db/db.js');
const {readdirSync} = require('fs');

const path = require("path");


require('dotenv').config();

const PORT = process.env.PORT;


//middlewares
app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
      })
}

//routes
readdirSync('./routes').map((route) => app.use('/api/v1',require('./routes/'+ route)))

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('Listening to Port:', PORT);
    })
}

server();