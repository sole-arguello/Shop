import { Router } from "express";
import cloudinary from "cloudinary";
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()
import { auth } from "../middlewares/auth.js";
import { authAdmin } from "../middlewares/authAdmin.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET

})

   
const router = Router();
//llevan autorizcion y admin
router.post('/upload',auth, authAdmin, (req, res) => {
    try {
        //console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ msg: 'No files were uploaded.' })
        
        const file = req.files.file;
       // console.log(file)
        if(file.size > 1024 * 1024) {//1mb
            removeTemp(file.tempFilePath)
            return res.status(400).json({ msg: "Size too large." })
        }
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            
            return res.status(400).json({ msg: "File format is incorrect." })
        }
            
        
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async(err, result) => {
            if(err) throw err;
            //res.json({result})
            removeTemp(file.tempFilePath)
            return res.json({ public_id: result.public_id, url: result.secure_url })
        })
    } catch (error) {
        //console.log('error upload rutas upload', error)
        return res.status(500).json({ mensagge: error.message })
    }
})

router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body
        //console.log("public_id del destroy", public_id)
        if(!public_id) return res.status(400).json({ msg: 'No images selected.' })
        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if(err) throw err
            res.json({ msg: "Deleted image from cloudinary successfully." })
        })
    } catch (error) {
        //console.log('error destroy rutas upload', error)
        return res.status(500).json({ mensagge: error.message })
    }
})

const removeTemp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}

export { router as uploadRouter }