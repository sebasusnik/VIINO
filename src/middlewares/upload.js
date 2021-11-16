const path = require('path');

// Configuracion de MULTER
// 1. Requerimos multer
// 2. Configuramos el storage (destination, filename)
// 3. Generar middleware upload
// 4. Utilizart el middleware en la ruta (mismo nombre del campo del formulario)
// 5. En el controlador guardamos el nombre de archivo que usamos aca

// EJS
// 6. Agregar un input type file con el mismo name que pasamos en la ruta
// 7. Agregar el enctype al form

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/product-img'))
    },
    filename: function (req, file, cb) {
        // file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        const newFilename = 'viino-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
