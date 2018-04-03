var express = require('express')
var app = express();

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

app.get('/', function(req, res){
    res.send('This is Elements!');
});

app.listen(app.elements.port, () => console.log('API listening on port ' + app.elements.port))