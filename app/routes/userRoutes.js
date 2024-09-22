// Import the Express framework to create a router
const express = require('express');
const router = express.Router();

// Import the user controller for handling user-related operations
const userController = require('../controllers/userController');

// Route to register a new user (POST request)
router.post('/register', userController.registerUser);

// Route to log in an existing user (POST request)
router.post('/login', userController.loginUser);

// Export the router to be used in the main application
module.exports = router;
