const express = require('express');

const router = express.Router();

// Example: GET /users
router.get('/', (req, res) => {
    res.json({ message: 'List of users' });
});

// Example: GET /users/:id
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Details for user ${userId}` });
});

// Example: POST /users
router.post('/', (req, res) => {
    // Add user creation logic here
    res.status(201).json({ message: 'User created' });
});

module.exports = router;