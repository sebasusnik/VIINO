const express = require ("express");
const router = express.Router();

const productController = require ("../controllers/productController.js");

router.get("/", productController.product);
router.get ("/edit", productController.edit);
router.get ("/create", productController.create);

module.exports= router;