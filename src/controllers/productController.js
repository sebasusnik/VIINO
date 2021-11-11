const path = require("path");
/* AGREGO COPIANDO DE LA CLASE */
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
/**estas tres lineas de arriba las copie igualver lo que tengo qe corregir en este progrma */

const productController = {

  // Shop
  list: (req, res) => {
    const productsAMostrar = products;
    res.render("./product/shop" , { productsAMostrar })
    },

  // Detail - Detail from one product
  product: (req, res) => {

    // Se recibe un objeto tipo producto
    const requiredId = req.params.id;

    // Buscar el producto en el array
    const requiredProduct = products.find((prod) => {
      // guarda como resultado el primer elemento que coincida con el param
      const condition = prod.id == requiredId;
      return condition;
    });

    res.render("./product/product", {
      product: requiredProduct
    });
  },

  // Update - Form to edit
  edit: (req, res) => {
    // Solo falta autocompletar los inputs y el action y method del form
    const requiredId = req.params.id;
    const productToEdit = products.find((prod) => {
      /* El primer elemento que devuelva true se guarda como resultado */
      const condition = prod.id == requiredId;
      return condition;
    });

    res.render('./product/edit', { product: productToEdit });
  },

  update: (req, res) => {

    // Leemos el id que viene por url
    const productId = req.params.id;
    // buscamos la posicion del producto que queremos editar
    const productIndex = products.findIndex((p) => p.id == productId);

    // Generamos el producto actualizado
    const updatedProduct = {
      ...products[productIndex],
      ...req.body,
      name: req.body.name,
      producer: req.body.producer,
      harvestYear: Number(req.body.harvestYear),
      varietal: req.body.varietal,
      type: req.body.type,
      price: Number(req.body.price),
      description: req.body.description,
      location: req.body.location,
      altitude: req.body.altitude,
      winemakers: req.body.winemakers,
      varietalComp: req.body.varietalComp,
      soil: req.body.soil,
      avb: Number(req.body.avb),
      breeding: req.body.breeding,
      price: Number(req.body.price),
      image: req.file ? req.file.filename : products[productIndex].image
    };
    console.log(req.body);
    console.log(products[productIndex]);
    console.log(updatedProduct);

    // Reemplazamos el objeto en el array
    products[productIndex] = updatedProduct;

    // Escribimos en el JSON para persistir
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

    // Volvemos a la pagina de productos
    res.redirect('/shop');
  },

  create: (req, res) => {
    res.render("./product/create");
  }

}

module.exports = productController;