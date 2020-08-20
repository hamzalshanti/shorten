require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const connectDB = require('./config/db');
const app = express();

// Connect DB
connectDB();

app.set('view engine', 'ejs')
app.use(express.json());


// Define A Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000
app.listen(PORT, () => console.log('server running'));

