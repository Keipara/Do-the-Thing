var express = require('express');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const { User } = require('../db/models');
const bcrypt = require('bcryptjs');

var router = express.Router();

const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 30 })
    .withMessage('First Name must not be more than 30 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 30 })
    .withMessage('Last Name must not be more than 30 characters long'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 50 })
    .withMessage('Email Address must not be more than 50 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for username')
    .isLength({ max: 30 })
    .withMessage('Username must not be more than 30 characters long'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    })
];

/* GET users listing. */

router.get('/signup', csrfProtection, function(req, res, next) {
  const user = User.build();
  res.render('signup-form', {
    title: 'Sign Up Form',
    user,
    csrfToken: req.csrfToken(),
  });
});

router.get('/login', function(req, res, next) {
  res.render('login-form');
});

/* POST */
router.post('/signup', csrfProtection, userValidators, asyncHandler(async(req,res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password
  } = req.body;

  const user = User.build({
    firstName,
    lastName,
    email,
    username
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('signup-form', {
      title: 'Sign Up Form',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }

}));

module.exports = router;
