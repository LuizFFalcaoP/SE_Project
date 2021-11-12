const express = require('express');

require('dotenv').config();
require("./config/database").connect();

// App
const app = express();

app.use(express.json());

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

module.exports = app;