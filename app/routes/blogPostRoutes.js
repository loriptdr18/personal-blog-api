// Import the Express framework to create a router
const express = require('express');
const router = express.Router();

// Import the blog post controller for handling blog-related operations
const blogPostController = require('../controllers/blogController');

// Import the authentication middleware to protect routes
const auth = require('../middleware/auth');

// Route to create a new blog post (POST request)
// This route is protected and requires authentication
router.post('/', auth, blogPostController.createPost);

// Route to get all blog posts (GET request)
// This route is protected and requires authentication
router.get('/', auth, blogPostController.getAllPosts);

// Route to get a specific blog post by its ID (GET request)
// This route is protected and requires authentication
router.get('/:id', auth, blogPostController.getPost);

// Route to update a blog post by its ID (PUT request)
// This route is protected and requires authentication
router.put('/:id', auth, blogPostController.updatePost);

// Route to delete a blog post by its ID (DELETE request)
// This route is protected and requires authentication
router.delete('/:id', auth, blogPostController.deletePost);

// Export the router to be used in the main application
module.exports = router;
