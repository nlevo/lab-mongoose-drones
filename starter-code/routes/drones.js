const express = require('express');

// require the Drone model here
const Drone = require('../models/drone');

const router = express.Router();


router.get('/', (req, res, next) => {
  // Iteration #2
    Drone.find({}, (err, drones) => {
        if(err) 
            return next(err)
        res.render('drones/index', {
            drones: drones
        });
    });
  });


router.get('/new', (req, res, next) => {
  // Iteration #3
  res.render('drones/new');
});

router.post('/', (req, res, next) => {
  // Iteration #3
  //take the params and translate them into a new object
  const droneInfo = {
    name:       req.body.name,
    propellers: req.body.propellers,
    maxSpeed:   req.body.maxSpeed,
}
//create a new product with the params passed in 
//form the "/products/new" form
const newDrone = new Drone(droneInfo);

newDrone.save((err) => {
    if (err) {
        return next(err);
    }
    //redirect to the list of products (/products) if it saves.
    return res.redirect('/drones');
  });
});

module.exports = router;
