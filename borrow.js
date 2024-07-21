const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to authenticate JWT
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

router.post('/borrow', authenticate, async (req, res) => {
    try {
        const { amount } = req.body;

        // Find user
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // Calculate tenure and monthly repayment
        const interestRate = 0.08;
        const tenure = 12; // Assuming a tenure of 12 months
        const monthlyRepayment = (amount * (1 + interestRate)) / tenure;

        // Update purchase power
        user.purchasePower -= amount;
        await user.save();

        res.status(200).json({
            message: 'Money borrowed successfully',
            purchasePower: user.purchasePower,
            monthlyRepayment
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
