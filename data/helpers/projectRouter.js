const express = require("express");

const projDb = require("./projectModel.js")

const router = express.Router();

//Get request to projects
//works
router.get('/',(req,res) => {
    projDb.get(req.params.id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        console.log(err,"error on Get request to projects");
        res.status(404).json({error: "Unable to retrieve projects."})
    });
});


module.exports = router;