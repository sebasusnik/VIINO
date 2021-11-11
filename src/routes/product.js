const express = require ("express");
const router = express.Router();

const productController = require ("../controllers/productController.js");

router.get("/", productController.list);

/*** CREATE PRODUCT FORM ***/
router.get ("/create", productController.create);

/*** GET ONE PRODUCT (DETAIL) ***/
router.get('/:id', productController.product);

/*** CREATE PRODUCT ***/
router.post ("/", productController.create);

/*** EDIT PRODUCT FORM ***/
router.get('/:id/edit', productController.edit);

/*** EDIT PRODUCT ***/
/** por ahora sin cambiar la imagen */
router.put('/:id', productController.update);
//router.put('/:id', upload.single('image'), productsController.update);
/** esta seria mi parte! */



/*** DELETE PRODUCT ***/
router.delete ('/:id')


module.exports= router;