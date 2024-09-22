// Import the BlogPost model to interact with the 'BlogPost' collection in MongoDB
const BlogPost = require('../models/blogPost');

// Controller to create a new blog post
exports.createPost = async (req, res) => {
  try {
    // Destructure title and content from the request body
    const { title, content } = req.body;

    // Create a new instance of BlogPost with the given title, content, and author (set from req.user.id)
    const newPost = new BlogPost({
      title,
      content,
      author: req.user.id, // Assuming req.user.id contains the authenticated user's ID
    });

    // Save the new post to the database
    const post = await newPost.save();

    // Return the saved post as a JSON response
    res.json(post);
  } catch (err) {
    // Log any error that occurs and send a 500 (Server Error) response
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller to get all blog posts
exports.getAllPosts = async (req, res) => {
  try {
    // Fetch all blog posts, sorted by creation date in descending order
    const posts = await BlogPost.find().sort({ createdAt: -1 });

    // Return the list of posts as a JSON response
    res.json(posts);
  } catch (err) {
    // Log any error that occurs and send a 500 (Server Error) response
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller to get a single blog post by its ID
exports.getPost = async (req, res) => {
  try {
    // Find a blog post by its ID, which is passed as a URL parameter (req.params.id)
    const post = await BlogPost.findById(req.params.id);

    // If the post doesn't exist, return a 404 (Not Found) response
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return the found post as a JSON response
    res.json(post);
  } catch (err) {
    // Log any error that occurs and send a 500 (Server Error) response
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller to update a blog post by its ID
exports.updatePost = async (req, res) => {
  try {
    // Destructure title and content from the request body
    const { title, content } = req.body;

    // Find the post by its ID
    let post = await BlogPost.findById(req.params.id);

    // If the post doesn't exist, return a 404 (Not Found) response
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update the post's title, content, and set the updatedAt field to the current date
    post.title = title;
    post.content = content;
    post.updatedAt = Date.now();

    // Save the updated post to the database
    await post.save();

    // Return the updated post as a JSON response
    res.json(post);
  } catch (err) {
    // Log any error that occurs and send a 500 (Server Error) response
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller to delete a blog post by its ID
exports.deletePost = async (req, res) => {
  try {
    // Find the post by its ID
    const post = await BlogPost.findById(req.params.id);

    // If the post doesn't exist, return a 404 (Not Found) response
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Delete the post using findByIdAndDelete
    await BlogPost.findByIdAndDelete(req.params.id);

    // Return a success message after deletion
    res.json({ message: 'Post removed' });
  } catch (err) {
    // Log any error that occurs and send a 500 (Server Error) response
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
