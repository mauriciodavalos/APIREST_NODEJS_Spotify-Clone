const multer = require("multer");
/**
 * 
 */
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage)
    },
    filename:function(req, file, cb){
        //TODO: mi-cv.pdf mifoto.png mivideo.mp4
        const ext = file.originalname.split(".").pop(); //TODO ["name", "png"]
        const filename = `file-${Date.now()}.${ext}`; //TODO file-738947218947.mp4   //now regresa un numero aleatorio entero
        cb(null, filename)
    }

})

const uploadMiddleware = multer ({storage})

/**
 * 
 */

module.exports = uploadMiddleware