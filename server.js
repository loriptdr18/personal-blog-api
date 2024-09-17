const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/', require('./app/routes/userRoutes'));
app.use('/api/posts', require('./app/routes/blogPostRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});