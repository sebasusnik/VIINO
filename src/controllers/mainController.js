const path = require ("path");

const fs = require('fs');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const mainController = 
{
    index: (req,res) => {
        /* The slice() method returns a shallow copy of a portion of an array into a new array object 
        selected from start to end ( end not included) where start and end represent 
        the index of items in that array */
        const productsMasVendidos = products.slice(0,7);
        const productsMasPremiados = products.slice(7,15);
        const productsRecomend = products.slice(12,20);
        res.render("./main/index" , { productsMasVendidos, productsMasPremiados, productsRecomend  })
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