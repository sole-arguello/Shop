import { Router } from "express";
import cloudinary from "cloudinary";
// import { auth } from "../middlewares/auth.js";
// import { authAdmin } from "../middlewares/authAdmin.js";

cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    // api_key: process.env.CLOUDINARY_KEY,
    // api_secret: process.env.CLOUDINARY_SECRET
    upload: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: process.env.CLOUDINARY_NAME,
          api_key: process.env.CLOUDINARY_KEY,
          api_secret: process.env.CLOUDINARY_SECRET,
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      }
})

   
const router = Router();

router.post('/upload', (req, res) => {
    try {
        //console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ msg: 'No files were uploaded.' })
        
        const file = req.files.file;
        console.log(file)
        if(file.size > 1024 * 1024) //1mb
            return res.status(400).json({ msg: "Size too large." })
        
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') 
            return res.status(400).json({ msg: "File format is incorrect." })
        
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async(err, result) => {
            if(err) throw err;
            
            removeTmp(file.tempFilePath)
            return res.json({ public_id: result.public_id, url: result.secure_url })
        })
    } catch (error) {

        return res.status(500).json({ mensagge: error.message })
    }
})

export { router as uploadRouter }