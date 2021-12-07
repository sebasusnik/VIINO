const express = require ("express");
const router = express.Router();

// Controller
const productsController = require ("../controllers/productsController.js");

// Middlewares
const uploadFile = require('../middlewares/uploadProd')


/*** PRODUCT ROUTES ***/

// Shop
router.get("/", productsController.list);

// Create Product Form
router.get ("/create", productsController.create);

// Create Product Process
router.post ("/", uploadFile.single("imageProd"), productsController.create);

// Product Detail
router.get('/:id', productsController.detail);

// Edit Product Form
router.get('/:id/edit', productsController.edit);

// Update Product
router.put('/:id', uploadFile.single('imageProd'), productsController.update);

// Delete Product
router.delete ('/:id', productsController.destroy);


module.exports= router;