const express = require('express');
const multer = require('multer');

const storageProfile =multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'assets/assets/images/profile')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const storageProduct =multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'assets/assets/images/product')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

var imageFileFilter= (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('You can upload only image files'),false);
    }
    else
        cb(null,true);
}


const uploadProfile = multer({storage: storageProfile, fileFilter:imageFileFilter})
const uploadProduct = multer({storage: storageProduct, fileFilter:imageFileFilter})

var uploadRouter = express.Router()

uploadRouter.route('/profile')
.post(uploadProfile.single('image'),
(req,res,next)=>{

    console.log(req.file);
                res.stausCode=200;

                res.setHeader('Content-Type','application/json');
                res.json(req.file);
},(err)=>next(err))


uploadRouter.route('/product')
.post(uploadProduct.single('image'),
(req,res,next)=>{
                console.log(req.file)
                res.stausCode=200;
                res.setHeader('Content-Type','application/json');
                res.json({status:"image Uploaded"});
},(err)=>next(err))
module.exports  = uploadRouter;