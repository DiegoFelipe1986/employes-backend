// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Var init
var app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
var appRoutes = require('./routes/app');
var employeRoutes = require('./routes/employe');

// DB conection
mongoose.connection.openUri('mongodb://localhost:27017/companyDB', (err, res) => {
    if (err) throw err;
    console.log('Db \x1b[32m%s\x1b[0m', ' OnLine')
});

// Routes
app.use('/employee', employeRoutes);
app.use('/', appRoutes);

// Listen request
app.listen(5000, () => {
    console.log('Express server puerto 5000:\x1b[32m%s\x1b[0m', ' OnLine')
});