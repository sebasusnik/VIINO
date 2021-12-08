function authMiddleware(req, res, next) {
	if (!req.session.userLogged) {  // Si no hay un usuario en Session, lo redirigimos
		return res.redirect('/user/login');
	}
	next();
}

module.exports = authMiddleware;