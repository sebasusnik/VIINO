const express = require ("express");
const router = express.Router();

// Controller
const usersController = require ("../controllers/usersController.js");

// Middlewares
const uploadFile = require('../middlewares/uploadUser')
const validations = require('../middlewares/userValidationMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


/*** USER ROUTES ***/

// Register Form
router.get('/register', guestMiddleware, usersController.register);

// Register Process
router.post('/register', uploadFile.single('image'), validations, usersController.processRegister);

// Login Form
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', usersController.loginProcess);

// User Profile
router.get('/profile', authMiddleware, usersController.profile);

// Logout
router.get('/logout', usersController.logout);


module.exports= router;