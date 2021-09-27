'use strict';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const oauthRoute = require('./routes/oauthRoutes');
app.use('/api/oauth', oauthRoute);
app.listen(PORT, function () {
    console.log(`SSD Authentication Server is running on PORT:  ${PORT}.`);
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://admin:admin@cluster0.eavwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to Database')
    })
    .catch(console.error)