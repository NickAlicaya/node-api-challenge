const express = require("express");

const actionRouter = require("./data/helpers/actionRouter.js");
const projectRouter = require("./data/helpers/projectRouter.js");

const server = express();


server.use(logger);
server.use(express.json());




server.get('/', (req,res) => {
    res.send(`<h1>Let's go do this sprint!<h1>`)
});



// Logger beybeh!

function logger(req, res, next) {
    const { method, originalUrl } = req;
    const time = Date.now()
    console.log(`${method} to ${originalUrl} on ${time}`);
  
    next();
  };

//Routing

server.use("/api/action",actionRouter);
server.use("/api/project",projectRouter);


module.exports = server;