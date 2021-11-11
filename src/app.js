const express = require('express');
const app = express();
const mainRouter = require ("./routes/main");
const productRouter = require ("./routes/product");
const userRouter = require ("./routes/user");
const path = require('path')

/*Para enviar peticiones por POST es necesario tener un formulario
desde el que se enviaran los datos. Hay que configurar el entorno de 
nuestra aplicación para que sea capaz de capturar esa información
con estas dos lineas PUSE ESTO COMO RECORDATORIO BORRARLO DESPUES*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*los formularios de HTML no soportan los métodos PUT y DELETE 
Hay que configurar app.js para poder sobreescribir el método original e implementarlos 
PUSE ESTO COMO RECORDATORIO BORRARLO DESPUES*/
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(express.static('public'));
app.set ("view engine", "ejs");
app.set ("views", "./src/views")


app.use ("/", mainRouter);
// NO OLVIDAR! Cambiar a products como piden en el Sprint!
app.use ("/product", productRouter);
app.use ("/user", userRouter);


app.listen(process.env.PORT || 3060, () => console.log('Servidor corriendo en el puerto 3060'));
