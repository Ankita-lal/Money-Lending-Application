const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { phone, email, name, dob, monthlySalary, password } = req.body;

        // Calculate age
        const age = new Date().getFullYear() - new Date(dob).getFullYear();

        // Validation
        if (age < 20) {
            return res.status(400).json({ message: 'User must be above 20 years of age.' });
        }
        if (monthlySalary < 25000) {
            return res.status(400).json({ message: 'Monthly salary should be 25k or more.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            phone,
            email,
            name,
            dob,
            monthlySalary,
            password: hashedPassword,
            status: 'Approved'
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
