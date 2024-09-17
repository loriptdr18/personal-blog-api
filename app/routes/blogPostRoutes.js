const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogController');
const auth = require('../middleware/auth');

router.post('/', auth, blogPostController.createPost);
router.get('/',auth, blogPostController.getAllPosts);
router.get('/:id',auth, blogPostController.getPost);
router.put('/:id', auth, blogPostController.updatePost);
router.delete('/:id', auth, blogPostController.deletePost);

module.exports = router;