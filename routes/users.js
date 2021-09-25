var express = require('express');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const { User, List } = require('../db/models');
const { loginUser, logoutUser, requireAuth } = require('../auth');
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
      return User.findOne({ where: { email: value } })
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
    await List.create({
      name: "School",

      userId: user.id

    });
    loginUser(req, res, user);
    res.redirect('/tasks');
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

const loginValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
];

router.get('/login', csrfProtection, function(req, res, next) {
  res.render('login-form', {
    title: 'Log In Form',
    csrfToken: req.csrfToken(),
  });
});

router.post('/login', csrfProtection, loginValidators, asyncHandler(async(req,res) => {
  const {username, password} = req.body
  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { username } });

    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

      if (passwordMatch) {
        loginUser(req, res, user);
        return res.redirect('/tasks')
      }
    }
    errors.push('Login failed for the provided username and/or password')
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }
  res.render('login-form', {
    title: 'Login',
    errors,
    csrfToken: req.csrfToken(),
  });
}));

router.get('/demo', asyncHandler(async (req, res) => {
  let demo = await User.findOne({ where: {email: 'demouser@demo.com'} });
  loginUser(req, res, demo);
  if(res.locals.authenticated) return res.redirect('/tasks');
  res.redirect('/');
}));

router.get('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/');
});

module.exports = router;
