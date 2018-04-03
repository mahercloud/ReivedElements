var express = require('express');
var elements = express();

var app = require('./../app.json');

var md5 = require('md5');

api.use(validateSignature);

elements.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

elements.get('/elements', function(req, res){
    res.send('This is Elements!');
});

elements.listen(app.elements.port, () => console.log('API listening on port ' + app.elements.port))

function validateSignature(req, res, next){
    if(
        (req.query.rand) && (req.query.expire) && (req.query.hash)
    ){
        req.query.expire = parseInt(req.query.expire);

        var hash = md5(JSON.stringify({
            rand: req.query.rand,
            expire: req.query.expire,
            public: app.keys.public,
            private: app.keys.private
        }));

        if(hash == req.query.hash){
            var ts = Math.round((new Date()).getTime() / 1000);
            if(ts > req.query.expire){
                res.send({
                    success: false,
                    error: 'EXPIRED',
                    error2: 'EXPIRED: ' + (ts - req.query.expire)
                });                
            }else{
                next();
            }
        }else{
            res.send({
                success: false,
                error: 'INVALID HASH'
            });
        }
    }else{
        res.send({
            success: false,
            error: 'MISSING_ARGS'
        });
    }
}