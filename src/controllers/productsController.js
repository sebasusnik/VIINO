const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, "../database/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
/**estas tres lineas de arriba las copie igualver lo que tengo qe corregir en este progrma */
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {


  /*** SHOP ***/

  // Root - List the products
  list: (req, res) => {
    const productsAMostrar = products; // Recibe el listado de productos
    res.render("./products/shop", { productsAMostrar }); // Lista todos los productos
  },


  /*** CREAR UN PRODUCTO ***/

  // CREATE - Form to create
  create: (req, res) => {
    if (req.method == "GET") {         // Si el metodo es GET muestra el formulario
    res.render("./products/create");
    } else {                           // Si el método es POST crea un producto
    const newProduct = {
      id: products[products.length - 1].id + 1,
      // Reutilizamos todas las props que vienen en el body con el spread operator
      ...req.body,
      image: req.file ? req.file.filename : "",
    };

    // Se agrega el nuevo producto al array de productos y se reescribe el JSON
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

    res.redirect("/");

  }
},

  /*** MUESTRA EL DETALLE DE UN PRODUCTO ***/

  // DETAIL - Detail from one product
  product: (req, res) => {
    // Se recibe un objeto tipo producto
    const requiredId = req.params.id;

    // Buscar el producto en el array
    const requiredProduct = products.find((prod) => {
      // guarda como resultado el primer elemento que coincida con el param
      const condition = prod.id == requiredId;
      return condition;
    });

    res.render("./products/products", {
      product: requiredProduct,
    });
  },

    /*** MUESTRA EL FORMULARIO DE EDICION ***/

  // EDIT - Form to edit
  edit: (req, res) => {
    // Solo falta autocompletar los inputs y el action y method del form
    const requiredId = req.params.id;
    const productToEdit = products.find((prod) => {
      /* El primer elemento que devuelva true se guarda como resultado */
      const condition = prod.id == requiredId;
      return condition;
    });

    res.render("./products/edit", {
      product: productToEdit
    });
  },


    /*** EDITA Y REESCRIBE EL PRODUCTO ***/

  // UPDATE - Update new product
  update: (req, res) => {
    // Leemos el id que viene por url
    const productId = req.params.id;
    // Buscamos la posicion del producto que queremos editar
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
      subtype: req.body.subtype,
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
      image: req.file ? req.file.filename : products[productIndex].image,
    };

    // Reemplazamos el objeto en el array
    products[productIndex] = updatedProduct;

    // Escribimos en el JSON el array con el producto actualizado
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

    // Volvemos al listado de productos
    res.redirect("/products");
  },


      /*** BORRA UN PRODUCTO ***/

  // DESTROY - Delete one product from DB
  destroy: (req, res) => {
    // Leer el id
    const productId = req.params.id;
    // Buscar la posicion actual del producto a eliminar
    const productIndex = products.findIndex((p) => p.id == productId);
    // Recortar el array sin ese producto
    products.splice(productIndex, 1);// Elimina un elemento indicandole en qué índice arranca (0 por defecto) e indicandole cuantos elementos borrar.. sino especifico extensión mata todo

    // Guardar el json nuevo
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

    // Redirecciona al listado de productos
    res.redirect("/");
  },
};

module.exports = productsController;