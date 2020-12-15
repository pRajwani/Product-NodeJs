var User = require('../models/users')
var {createAccessToken,createRefreshToken,verifyAccessToken,verifyRefreshToken} = require('../services/jwt')

exports.authenticateUser =(userData, res, next) => {
    console.log(typeof(userData.username)!='number')
    if(typeof(userData.username)!='number') {
            User.findOne({username:userData.username, password:userData.password})
            .then((user)=>{
                if(user) {
                   user = {
                    _id: user._id,
                  };
                  aToken = createAccessToken(user);
                  rToken = createRefreshToken(user);
                  res.cookie("rTok", rToken, {httpOnly: true});
                  res.json({success:true, status:"Login Successfull", accessToken:aToken});
               } 
               else {
                   res.json({success:false, status: "No user found"})
               }
            }, (err)=> next(err))
            .catch((err)=>next(err));
    }

    else {
            User.findOne({mobile_Number:userData.username, password:userData.password})
            .then((user)=>{
                if(user) {
                   user = {
                    _id: user._id,
                  };
                  console.log(user)
                  aToken = createAccessToken(user);
                  rToken = createRefreshToken(user);
                  res.cookie("rTok", rToken, {httpOnly: true});
                  res.json({success:true, status:"Login Successfull", accessToken: aToken});
                }
                else {
                    res.json({success:false, status: "No user found"})
                }   
            },(err)=>{next(err)})
            .catch((err)=>{next(err)})
        }
}