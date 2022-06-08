var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var mysql = require('mysql');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());

app.use(session({
    secret: "This is a secret!", 
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(express.json());

app.use(cors());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_product',
});

connection.connect(function(err){
    if (err){
        console.log('Error connecting to Database : ' + err);
        return;
    }
    // if (err) throw err; 
    console.log('Connection to database successful');
});

app.get('/product', function (req, res){
    var sql = 
    `SELECT product.id,
    gender.gender_name AS gender,
    size.size_name AS size,
    style.style_name AS style, 
    substyle.sub_name AS substyle,
    product.price AS price

    FROM product 
    JOIN gender ON product.id = gender.id 
    JOIN size ON product.id = size.id 
    JOIN style ON product.id = style.id 
    JOIN substyle ON style.id = substyle.id;`;
    connection.query(sql, function(err, result){
        if (err){
            console.log(err);
            return ;
        }
        var results = JSON.stringify(result);
        res.send(results);
    });
    
});


app.get('/product/id/:id([0-9])', function (req, res) {
    var sql = "SELECT * FROM product WHERE id ="+req.params.id+"";
    connection.query(sql, function(err, result){
        if (err) throw err;
        // console.log('Result : '+JSON.stringify(result));
        // res.json(result);
        var results = JSON.stringify(result);
        res.send(results);
    })
});

app.get('/product/gender/:gender', function (req, res) {
    var gender = req.params.gender;
    if (gender == 'Men' || gender == 'Women') {
        var sql = `
        SELECT product.id AS id,
        gender.gender_name AS gender,
        product.price AS price 
        FROM product 
        JOIN gender ON product.id = gender.id WHERE gender_name = '${gender}' `;

        connection.query(sql, function(err, result){
            if (err) throw err;
            var results = JSON.stringify(result);
            res.send(results);   
        });
    } 
});

app.get('/product/size/:size([A-Z]{1,2})', function (req, res){
    var size = req.params.size;
    var sql = `
        SELECT product.id AS id,
        size.size_name AS size,
        product.price AS price 
        FROM product 
        JOIN size ON product.id = size.id WHERE size_name = '${size}' `;
        
    connection.query(sql, function(err, result){
        if (err) throw err;
        var results = JSON.stringify(result);
        res.send(results);
    })
})

app.get('/product/style/:style/:substyle', function (req, res){
    var style = req.params.style;
    var substyle = req.params.substyle;
    
    var sql = `
        SELECT product.id AS id,
        style.style_name AS style,
        substyle.sub_name AS substyle,
        product.price AS price
        FROM product 
        JOIN style ON product.id = style.id 
        JOIN substyle ON style.id = substyle.id
        WHERE style.style_name = '${style}' AND substyle.sub_name = '${substyle}'`;
        
    connection.query(sql, function(err, result){
        if (err) throw err;
        var results = JSON.stringify(result);
        res.send(results);
    })
})
var productArr = [];
app.post('/product/addCart', function (req, res) {

    var product = {
        'id' : req.body.id,
        'gender' : req.body.gender,
        'size' : req.body.size,
        'style' : req.body.style,
        'substyle' : req.body.substyle,
        "price" : req.body.price
    }
    session = req.session;
    productArr.push(product);
    session.getProduct = productArr;
    res.send(session.getProduct);
    
});
app.get('/product/getCart', function (req, res) {
    if (session.getProduct) {
        console.log("SESSION is set");
        console.log(session.getProduct);
        res.send(session.getProduct); 
    } else {
        console.log("SESSION is unset")
    }
    // res.send(req.session.product);
})
app.post('/product/createOrder' , function (req, res) {
    var id = session.getProduct;
    var idArr = [];
    
    for (let obj in id) {
        idArr.push(id[obj].id);
    }

    
    var address = req.body.address;
    var totalPrice = req.body.totalPrice;
    
    console.log(JSON.stringify(idArr));

    var sql = `INSERT INTO purchase_order ( products_id, status,sum, address) VALUES ("${idArr}","pending","${totalPrice}","${address}")`;
    connection.query(sql,function(err, result) {
        if (err) throw err;
        console.log(result);
        if (result.affectedRows > 0) {
            productArr = [];
            session.getProduct = productArr;
            res.send(true);
        }
    });

});
app.listen(3000);