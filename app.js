const express = require('express');
const app = express();

const path = require('path')

app.use(express.urlencoded());

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'views/index.html'))});
app.get('/shop', (req, res) => {res.sendFile(path.join(__dirname, 'views/shop.html'))});
app.get('/product', (req, res) => {res.sendFile(path.join(__dirname, 'views/product.html'))});
app.get('/cart', (req, res) => {res.sendFile(path.join(__dirname, 'views/cart.html'))});
app.get('/signup', (req, res) => {res.sendFile(path.join(__dirname, 'views/signup.html'))});
app.get('/login', (req, res) => {res.sendFile(path.join(__dirname, 'views/login.html'))});


app.use(express.static('public'));


app.listen(process.env.PORT || 3000, () => console.log('Servidor corriendo'));
