var User = require("../models/users")

exports.userSignUp = (req, res, next) => {
    User.findOne({$or:[{username:req.body.username}, {mobile_Number:req.body.mobile_Number}]})
    .then((user)=>{
        if(user) res.json({success:false, status:"User already registered"})
        else {
            User.create(req.body)
            .then((user)=>{      
                if(user)
                res.json({success:true,status:"User Registered", user:user})
            },(err)=>next(err))
        .catch((err)=>next(err))
        } 
    })
}