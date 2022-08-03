const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 5000;


var app = express();
app.use(bodyParser.json());
app.use(cors());


// API end points decided from this routes
const rtsIndex = require('./routes/index.router');
app.use('/', rtsIndex);


// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});


// Code to start the server
app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));
