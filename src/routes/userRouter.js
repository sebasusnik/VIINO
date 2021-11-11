const express = require ("express");
const router = express.Router();

const userController = require ("../controllers/userController.js");

router.get("/signup", userController.signup);
router.get("/login", userController.login);
router.get("/", userController.perfil);

module.exports= router;