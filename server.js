const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes');
const path = require('path');
const methodOverride = require('method-override'); // For PUT/DELETE




// Load environment variables
dotenv.config();

// Debug: Check if MONGODB_URI is loaded
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static(path.join(__dirname, 'public'))); // For serving static files
app.use(methodOverride('_method')); // For PUT/DELETE




// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).
then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Routes
app.use('/employees', employeeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// Redirect from / to /register
// Home route
app.get('/', (req, res) => {
    res.redirect('/employees');
  });

  // View Engine setup (EJS example)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');