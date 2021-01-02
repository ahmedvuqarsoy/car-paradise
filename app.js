const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Static Files
app.use( express.static( "public" ));

// Passport Config
require('./config/passport')(passport);

// DB Connection
mongoose.connect('mongodb://localhost:27017/car-dealer', {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection Error: ", err));


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

 

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/car', require('./routes/car.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
