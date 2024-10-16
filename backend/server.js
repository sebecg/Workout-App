const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const app = express();

// Enable CORS for the frontend origin and allow credentials
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// Parse JSON request bodies
app.use(express.json());
// Set up session middleware
app.use(session({
  secret: 'safety key', 
  resave: true,
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/workoutapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User schema and model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Define Set and Workout schemas and models
const SetSchema = new mongoose.Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true }
});
const WorkoutSchema = new mongoose.Schema({
  username: { type: String, required: true },
  exercise: { type: String, required: true },
  sets: [SetSchema],
  createdAt: { type: Date, default: Date.now }
});
const Workout = mongoose.model('Workout', WorkoutSchema);

// Signup route
app.post('/api/users/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create and save the new user
    const user = new User({ username, password: hashedPassword });
    await user.save();
    // Set the session username
    req.session.username = username; 
    res.status(201).json({ success: true, message: 'User created successfully', username });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
  }
});

// Login route
app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user and compare passwords
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }
    // Set the session username
    req.session.username = username;
    // Save the session
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Session after login:', req.session);
    res.json({ success: true, message: 'Login successful', username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error during login', error: error.message });
  }
});

// Add workout route
app.post('/api/workouts', async (req, res) => {
  console.log('Full session object:', req.session);
  console.log('Cookies:', req.headers.cookie);
  console.log('Session in POST /api/workouts:', req.session);
  try {
    const { exercise, sets } = req.body;
    const username = req.session.username;
    console.log('Username from session:', username);
    if (!username) {
      return res.status(401).json({ message: 'Unauthorized - No username in session' });
    }
    // Create and save the new workout
    const workout = new Workout({ username, exercise, sets });
    await workout.save();
    res.status(201).json({ message: 'Workout added successfully', workoutId: workout._id });
  } catch (error) {
    console.error('Error adding workout:', error);
    res.status(500).json({ message: 'Error adding workout', error: error.message });
  }
});

// Get workouts route
app.get('/api/workouts', async (req, res) => {
  try {
    const username = req.session.username;
    // Fetch workouts for the logged-in user, sorted by creation date (newest first)
    const workouts = await Workout.find({ username }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error: error.message });
  }
});

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));