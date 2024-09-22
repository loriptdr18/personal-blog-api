// Import the Express framework for creating the server
const express = require('express');
const serverless = require('serverless-http');
// Import Mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Import dotenv to load environment variables from a .env file into process.env
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Set the server's port number from an environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database using the MONGOURI from environment variables
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true, // Use the new URL parser (a recommended setting)
  useUnifiedTopology: true, // Use the new unified topology engine (improves connection handling)
})
.then(() => console.log('Connected to MongoDB')) // Log a success message when connected
.catch((err) => console.error('MongoDB connection error:', err)); // Log an error message if the connection fails

// Define a route for user-related APIs, which are handled by userRoutes
// app.use('/api/', require('./app/routes/userRoutes'));
app.use('/.netlify/functions/api', require('../app/routes/userRoutes'));

// Define a route for blog post-related APIs, handled by blogPostRoutes
// app.use('/api/posts', require('./app/routes/blogPostRoutes'));
app.use('/.netlify/functions/api/posts', require('../app/routes/blogPostRoutes'));

// Start the server and listen on the specified port, logging a message when it starts
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
module.exports.handler = serverless(app);
