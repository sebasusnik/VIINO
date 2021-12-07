const express = require('express');
const app = express();
const mainRouter = require ("./routes/main");
const productsRouter = require ("./routes/products");
const userRouter = require ("./routes/user");
const path = require('path')
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');


// Sessions
app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

// Cookies
app.use(cookies());

// HTML forms encoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// PUT and DELETE method override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Statics
app.use(express.static(path.join(__dirname, '../public')));
// Template Engine
app.set ("view engine", "ejs");
// Views
app.set('views', path.join(__dirname, '/views'));

// Keep User Logged
app.use(userLoggedMiddleware);

// Routes
app.use ("/", mainRouter);
app.use ("/products", productsRouter);
app.use ("/user", userRouter);

// ************ error handler ************
//app.use((req, res, next) => next(createError(404)));

/*
app.use((err, req, res, next) => {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.render('error');
}); 
*/


app.listen(process.env.PORT || 3060, () => console.log('Servidor corriendo en el puerto 3060'));
