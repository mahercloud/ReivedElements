var express = require('express');
var elements = express();

var app = require('./../app.json');

elements.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

elements.get('/', function(req, res){
    res.send('This is Elements!');
});

elements.listen(app.elements.port, () => console.log('API listening on port ' + app.elements.port))