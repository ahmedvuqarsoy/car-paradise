const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Car = require('../models/Car');

router.get('/', (req, res) => {
    res.send('/car page');
});

router.get('/add', ensureAuthenticated, (req, res) =>
  res.render('add', {
    user: req.user
  })
);

router.post('/add', (req, res) => {
    const {brand, model, bodyType, year, color, mileage, engine, volumetric, location, description} = req.body;
    let errors = [];
    if (!brand, !model, !bodyType, !year, !color, !mileage, !engine, !volumetric, !location, !description) {
        errors.push({msg: 'Please enter all fields'});
    }
    owner = req.user._id;

    console.log(req.body);
    console.log(owner);
    console.log(req.user);

    if (errors.length > 0) {
        res.render('add', {
            errors,
            brand,
            model,
            bodyType,
            year,
            color,
            mileage,
            engine,
            volumetric,
            location,
            description
        });
    } else {
        const newCar = new Car({
            brand,
            model,
            bodyType,
            year,
            color,
            mileage,
            engine,
            volumetric,
            location,
            description,
            owner
        });

        newCar
            .save()
            .then( () => {
                req.flash(
                    'success_msg', 'You added the car successfully'
                );
                res.redirect('/dashboard');
            })
            .catch(err => console.log(err));
    }
});

module.exports = router;