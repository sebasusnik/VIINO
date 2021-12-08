const path = require('path');

const validator=require('express-validator')

const valideteRegister=[
    validator.check('first_name')
        .notEmpty().withMessage('Tenés que ingresar un nombre')
        .isStrongPassword({ minLength: 0, minLowercase: 0, minUppercase: 1, minNumbers: 0, minSymbols: 0}).withMessage('Tenés que ingresar tu nombre comenzando con una mayúscula'),
    validator.check('last_name')
        .notEmpty().withMessage('Tenés que ingresar un apellido')
        .isStrongPassword({ minLength: 0, minLowercase: 0, minUppercase: 1, minNumbers: 0, minSymbols: 0}).withMessage('Tenés que ingresar tu apellido comenzando con una mayúscula'),
    validator.check('email')
        .notEmpty().withMessage('Tenés que ingresar un email').bail()
        .isEmail().withMessage('Tenés que ingresar un email válido'),
    validator.check('password')
        .notEmpty().withMessage('Tenés que ingresar una contraseña').bail()
        .isStrongPassword({ minLength: 6, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0}).withMessage("La contraseña tiene que incluir al menos 6 caracteres").bail()
        .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 0, minNumbers: 0, minSymbols: 0}).withMessage("La contraseña tiene que incluir al menos una letra minúscula").bail()
        .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0}).withMessage("La contraseña tiene que incluir al menos una letra mayúscula").bail()
        .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0}).withMessage("La contraseña tiene que incluir al menos un caracter que sea numérico").bail()
        .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage("La contraseña tiene que incluir al menos un caracter que sea un símbolo"),
    validator.check('imageUser')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

            if (!file) {
                throw new Error('Tienes que subir una imagen');
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }

            return true;
        })
    ]

module.exports=valideteRegister