'use strict';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//define routes
const oauthRoute = require('./routes/oauthRoutes');
app.use('/api/oauth', oauthRoute);
//start server in port 5000
app.listen(PORT, function () {
    console.log(`SSD Authentication Server is running on PORT:  ${PORT}.`);
});

