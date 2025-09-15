const express = require('express');

const router = express.Router();

// POST /login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Replace with your authentication logic
    if (username === 'admin' && password === 'password') {
        // Example: set session or token here
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;