const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Car = require('../models/Car');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {

  const car = Car.find( {owner: req.user._id}, (error, data) => {
    if(error){
      console.log(error);
    }else {
      // console.log(data);
      res.render('dashboard', {
        user: req.user,
        cars: data
      });
    }
  });



  }
);

module.exports = router;