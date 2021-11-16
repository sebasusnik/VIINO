const express = require ("express");
const router = express.Router();
// para subir archivos necesitamos multer
const upload = require('../middlewares/upload');

const productsController = require ("../controllers/productsController.js");


/*** SHOP ***/
router.get("/", productsController.list);

/*** CREATE PRODUCT FORM ***/
router.get ("/create", productsController.create);
/*** CREATE PRODUCT ***/
router.post ("/",upload.single("imageProd"), productsController.create);

/*** GET ONE PRODUCT (DETAIL) ***/
router.get('/:id', productsController.product);

/*** EDIT PRODUCT FORM ***/
router.get('/:id/edit', productsController.edit);

/*** EDIT PRODUCT ***/
router.put('/:id', upload.single('imageProd'), productsController.update);

/*** DELETE PRODUCT ***/
router.delete ('/:id', productsController.destroy);


module.exports= router;