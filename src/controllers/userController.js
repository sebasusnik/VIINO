const path = require ("path");

const userController = 
{
    signup: (req,res) => {
        res.render("./user/signup")
    },

    login: (req,res) => {
        res.render("./user/login")
    },

    perfil: (req,res) => {
        res.send("Aquí podrás ver tu perfil")
    }
}

module.exports = userController;