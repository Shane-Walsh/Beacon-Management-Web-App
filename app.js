/*
REF: SSD4 Web App Dev course material lab 2 + 3
https://ddrohan.github.io/wit-wad/topic02-node/book-b-lab02/index.html#/06
REF: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
REF: http://mongoosejs.com/
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var beacons = require("./routes/beacons");
var products = require("./routes/products");
var vouchers = require("./routes/vouchers");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Refactor here for web-pack bundle
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// beacon routes
app.get('/beacons', beacons.listAll);
app.get('/beacons/:name', beacons.findByName);
app.get('/beacons/:status/active', beacons.listActive);
app.get('/beacons/:status/dormant', beacons.listInActive);
app.get('/beacons/:venue/search', beacons.fuzzySearch);
app.post('/beacons', beacons.addBeacon);
app.put('/beacons/:name/venue', beacons.updateVenue);
app.put('/beacons/:name/platform', beacons.updatePlatform);
app.put('/beacons/:name/status', beacons.setStatus);
app.delete('/beacons/:name', beacons.deleteBeacon);

//product routes
app.get('/products', products.findAll);
app.get('/products/:designation', products.findOne);
app.get('/products/:brand/search', products.partialSearch);
app.post('/products', products.addProduct);
app.delete('/products/:designation', products.deleteProduct);
app.put('/products/:designation/brand', products.updateBrand);
app.put('/products/:designation/type', products.updateType);
app.put('/products/:designation/description', products.updateDesc);
app.put('/products/:designation/price', products.updatePrice);


//voucher routes
app.get('/vouchers', vouchers.listAll);
app.get('/vouchers/:id', vouchers.findByID);
app.post('/vouchers', vouchers.addVoucher);
app.delete('/vouchers/:id', vouchers.deleteVoucher);
app.put('/vouchers/:id/value', vouchers.updateValue);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
