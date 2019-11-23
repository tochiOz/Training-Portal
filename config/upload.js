const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 100000
    },

    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|svg|PNG)$/)) {
            return cb(new ErrorEvent('PLease upload a Picture format'))
        }

        cb( undefined, true )
    }
})

module.exports = upload;