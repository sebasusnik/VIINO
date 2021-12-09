const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

const User = require('../models/User');

const userController = 
{
	// Sign Up Form
    register: (req,res) => {
        res.render("./user/register")
    },

	// Process registration
    processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('user/register', {
				errors: resultValidation.mapped(), // Si el usuario quiere registarse, pero no cumple con los requisitos de registración, los mismos son informados
				oldData: req.body
			});
		}

		console.log(resultValidation)
		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('user/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado' // Si el usuario quiere registarse, pero ya lo hizo, se le informa que no debe registrarse nuevamente
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body, // Reutilizamos todas las props que vienen en el body con el spread operator
			password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file ? req.file.filename : "generic.png ", //si no viene una imagen cargo una genérica
			category: "user",
		}

		let userCreated = User.create(userToCreate); // Si completa correctamente el formulario, el usuario es ingresado a la basa de datos

		return res.redirect('/user/login');
	},

    login: (req,res) => {
        res.render("./user/login")
    },
    loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 * 3 })
				}

				return res.redirect('/user/profile');
			} 
			return res.render('user/login', {
				errors: {
					password: {
						msg: 'Las credenciales son inválidas'
					},
				}
			});
		}

		return res.render('user/login', {
			errors: {
				email: {
					msg: 'Este email no se encuentra registrado'
				}
			}
		});
	},

	profile: (req, res) => {
		return res.render('user/profile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('main/index');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = userController;