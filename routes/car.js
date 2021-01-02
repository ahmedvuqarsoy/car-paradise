const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Static Files Folder
router.use(express.static(__dirname + './public'));

var Storage = multer.diskStorage({
    destination:'./public/uploads/',
    filename:(req, file, cb) => {
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
})

var upload = multer({storage: Storage}).single('file');

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

router.post('/add', upload, (req, res) => {
    const {brand, model, bodyType, year, color, mileage, engine, volumetric, location, description} = req.body;
    let errors = [];
    if (!brand, !model, !bodyType, !year, !color, !mileage, !engine, !volumetric, !location, !description) {
        errors.push({msg: 'Please enter all fields'});
    }
    owner = req.user._id;

    console.log(req.body);
    console.log(owner);
    console.log(req.user);

    // const image = req.body.file;
    const img = req.file.filename;
    console.log('img: ', img);


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
            description,
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
            img,
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