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
const { render } = require('ejs');

router.get('/', (req, res) => {

    const car = Car.find((error, data) => {
        if(error){
          console.log(error);
        }else {
          // console.log(data);
          res.render('all', {
            cars: data
          });
        }
      });
});


router.get('/add', ensureAuthenticated, (req, res) =>
  res.render('add', {
    user: req.user
  })
);

router.post('/add', upload, (req, res) => {
    const {brand, model, bodyType, year, color, mileage, engine, volumetric, location, description, price} = req.body;
    let errors = [];
    if (!brand, !model, !bodyType, !year, !color, !mileage, !engine, !volumetric, !location, !description) {
        errors.push({msg: 'Please enter all fields'});
    }
    owner = req.user._id;
    ownerName = req.user.name;
    ownerMail = req.user.email;

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
            price,
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
            price,
            location,
            description,
            img,
            owner,
            ownerMail,
            ownerName
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

// Detail Page
router.get('/:id', ensureAuthenticated, (req, res) => {
    const id = req.params.id;
    Car.findById(id)
        .then(result => {
            res.render('details', {user: req.user, car: result})
        })
        .catch(err => {
            console.log(err);
        })
})

router.delete('/:id', ensureAuthenticated, (req, res) => {
    const id = req.params.id;
    Car.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/dashboard'})
    })
    .catch(err => {
        console.log(err);
    })
})


// Edit
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    const id = req.params.id;
    Car.findById(id)
        .then(result => {
            res.render('edit', {user: req.user, car: result})
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = router;