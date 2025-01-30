const express = require('express');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Add authentication logic here
    res.status(200).json({ message: 'Login successful!' });
});

// Register route
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    // Add registration logic here
    res.status(201).json({ message: 'Registration successful!' });
});

module.exports = router;
