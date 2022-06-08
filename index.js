var express = require('Express');
var app = express();

var things = require('./things');

// use router things 

/*
app.use('/home', things);

app.get('/home/:name/:id',function (req, res) {
    res.send('id : ' + req.params.id + ' name : ' + req.params.name );
})

app.get('/home/:id([0-9]{5})', function (req, res) {
    res.send('id: '+ req.params.id);
});

app.use('/index',function (req, res, next){
    console.log("A new request recieved at "+ Date.now());
    next();
    
});
app.get('/index', function (req, res) {
    res.send('index page!!');
});
app.get('/index/:id',function (req, res){
    res.send(" THIS ID : " + req.params.id);
})
*/


app.use(function (req, res, next){
    console.log("Start");
    next();
});
app.get('/',function (req, res, next){
    res.send("Middle");
    next();
})
app.use('/',function(req,res){
    console.log("End");
})
// regEX url
/*
app.use('*', function (req, res, next){
    console.log("Invalid URL, Please try again");
    next();
})
app.get('*', function (req, res) {
    res.send("Sorry, This is invalid URL. Please try again");
});
*/


app.listen(3000);