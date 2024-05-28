const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let imageFolder = ""
        if(req.baseUrl.includes("users")){
            imageFolder = 'users';
        }
        else if(req.baseUrl.includes("photos")){
            imageFolder = 'photos'
        }
        cb(null, `uploads/${imageFolder}/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const uploadImage = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            //just accepts jpg and png files
            return cb(new Error ("Insira uma imagem do tipo jpg ou png"))
        }
        cb(undefined, true)
    }
})

module.exports = {uploadImage}