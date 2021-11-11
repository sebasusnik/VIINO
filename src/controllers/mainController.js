const path = require ("path");

const fs = require('fs');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const mainController = 
{
    index: (req,res) => {
        res.render("./main/index")
    },

    shop: (req,res) => {
        const productsAMostrar = products;
        res.render("./main/shop" , { productsAMostrar })
        },

    cart: (req,res) => {
        res.render("./main/cart")
    }
}

module.exports = mainController;