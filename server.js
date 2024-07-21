const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moneyLendingApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Routes
app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/user'));
app.use(require('./routes/borrow'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
