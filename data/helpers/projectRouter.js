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

//Get request to project with specified id
//works!!!

router.get('/:id',validateProjectID,(req,res) => {
    projDb.get(req.params.id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        console.log(err,"error on Get request to project");
        res.status(404).json({error: "No project with specified id exists."})
    });
});


//Post new project
//yahoo it works

router.post('/',(req,res) => {
    const {name, description} = req.body
    projDb.insert(req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err,"Error in post request to project.");
        res.status(500).json({error: "Unable to save project to database."})
    });
});

//DELETES a project based on id
//HELL YEAH it WORKS!

router.delete('/:id',validateProjectID,(req,res) => {
    projDb.remove(req.params.id)
     .then(project => {
   res.status(202).json({message: "project has been deleted."});
 })
 .catch(err => {
     console.log(err,"ERROR in Delete request to projects.");
     res.status(500).json({error: "Error cannot delete project."})
 });
});

//Get Project actions
//Works Hell yeah I got the logic right!!!

router.get('/projectactions/:id', (req,res) => {
    projDb.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err, "Error in getting project actions.");
        res.status(500).json({error: "Error retrieving actions for specified project id"})
    })
})

//Put request to edit projects
// ALL CRUD OPERATIONS TESTED AND WORKING!

router.put('/:id',validateProjectID,(req,res) => {
    projDb.update(req.params.id,req.body)
    .then(action => {
        res.status(200).json({message:`Successfully updated project with id`})
    })
    .catch(err => {
        console.log(err, "Error in attempt to update project");
        res.status(500).json({error: "Could not update project."})
    })
})


//middleware
function validateProjectID(req, res, next) {
      const id = req.params.id
    projDb
      .get(id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({ error: `Project ${id} not found` });
        }
      })
      .catch(err => res.status(500).json(Error_Message));
  }

module.exports = router;