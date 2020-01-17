const express = require("express");

const actDb = require("./actionModel.js");

const router = express.Router();


//Get all actions
//works
router.get('/',(req,res) => {
    actDb.get()
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        console.log(err,"error on Get to actions");
        res.status(404).json({error: "Error retrieving actions."})
    });
});


// Get action with specific ID
//works
router.get('/:id',validateActionID,(req,res) => {
    actDb.get(req.params.id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        console.log(err,"error on Get request to action");
        res.status(404).json({error: "No action with specified id exists."})
    });
});

//Post to add a new action
//WORKS AGAIN BWAHAHAHA!
router.post('/',validateAction,(req,res) => {
    const {project_id, description, notes} = req.body
    actDb.insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err,"Error in post request to actions.");
        res.status(500).json({error: "Unable to save action to database."})
    })
})

//DELETES an action based on id
//HELL YEAH it WORKS!

router.delete('/:id',validateActionID,(req,res) => {
    actDb.remove(req.params.id)
     .then(action => {
   res.status(202).json({message: "action has been deleted."});
 })
 .catch(err => {
     console.log(err,"ERROR in Delete request to actions.");
     res.status(500).json({error: "Error cannot processs delete request."})
 });
});

//FINALLY A Put request to update actions
//Works, need to do middleware for fun


router.put('/:id',validateActionID,(req,res) => {
    actDb.update(req.params.id,req.body)
    .then(action => {
        res.status(200).json({message:`Successfully updated action with id`})
    })
    .catch(err => {
        console.log(err, "Error in attempt to update action");
        res.status(500).json({error: "Could not update action."})
    })
})


//middleware

  function validateActionID(req, res, next) {
      const id = req.params.id
    actDb
      .get(id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(404).json({ error: `Action with id: ${id} not found` });
        }
      })
      .catch(err =>
        res.status(500).json("Error getting action")
      );
  }

  function validateAction(req, res, next) {
    const {description,notes} = req.body;
    if (!description || !notes) {
      res.status(400).json({ message: "Missing description or notes" });
    } else if (typeof name || description !== "string") {
      res.status(400).json({error: "Invalid  description or notes."})  
    } else {
        next();
    }
  }

module.exports = router;