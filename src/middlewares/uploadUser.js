const multer = require('multer')

const path = require('path')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const folder = path.join(__dirname, '../../public/img/users-img');
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        const newFileName = 'user-' + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const uploadImageUser = multer({ storage })

module.exports = uploadImageUser