const path = require ("path");

const productController = 
{
    product: (req,res) => {
        res.render ("./product/product")
    },
    
    edit: (req,res) => {
        res.send ("Aquí podrás editar un producto")
    },
    list: (req,res) => {
        res.send ("Aquí se mostrará la lista de los productos existentes");
    },
    create: (req,res) => {
        res.render ("./product/create")
    }
    
}

module.exports = productController;