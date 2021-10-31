const express = require('express');
const app = express();
const mainRouter = require ("./routes/mainRouter");
const productRouter = require ("./routes/productRouter");
const userRouter = require ("./routes/userRouter");
const path = require('path')

app.use(express.static('public'));
app.set ("view engine", "ejs");
app.set ("views", "./src/views")


app.use ("/", mainRouter);
app.use ("/product", productRouter);
app.use ("/user", userRouter);


app.listen(process.env.PORT || 3060, () => console.log('Servidor corriendo'));
