const User = require('../models/User');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail; // Tomamos el dato de la cookie
	let userFromCookie = User.findByField('email', emailInCookie); // Buscamos al usuario de la cookie

	if (userFromCookie) {
		req.session.userLogged = userFromCookie; // Si hay un usuario en la cookie lo cargamos a session
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true; 
		res.locals.userLogged = req.session.userLogged; // Si el usuario está loggeado pasamos los datos a locals para usar en las vistas
	}

	next();
}

module.exports = userLoggedMiddleware;