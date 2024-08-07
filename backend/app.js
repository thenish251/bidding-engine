const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const bidRoutes = require('./routes/bidRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api', bidRoutes);
app.use('/api', userRoutes);

module.exports = app;
