function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {  // Si hay un usuario en session lo redirigimos
		return res.redirect('/user/profile');
	}
	next();
}

module.exports = guestMiddleware;