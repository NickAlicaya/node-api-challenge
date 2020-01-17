const express = require("express");



const server = express();


server.get('/', (req,res) => {
    res.send(`<h1>Let's go do this sprint!<h1>`)
});


module.exports = server;