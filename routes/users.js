var express = require("express");
var passport = require("passport");
var {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../services/jwt");
var { authenticateUser } = require("../services/authenticateUser");
var { userSignUp } = require("../services/userSignUp");
var router = express.Router();
var User = require("../models/users");

/* GET users listing. */
router.post("/login", (req, res, next) => {
  authenticateUser(req.body, res, next);
});

router.post("/signUp", (req, res, next) => {
  userSignUp(req, res, next);
});

router.get("/checkCode", (req, res, next) => {
  rToken = req.cookies["rTok"];
  console.log("checkCode rT:", rToken);
  resp = verifyRefreshToken(rToken);
  console.log("verify Rt resp", resp);
  if (resp.verify == true) {
    aTok = createAccessToken(resp.result);
    rTok = createRefreshToken(resp.result);
    res.cookie("rTok", rTok, { httpOnly: true });
    res.json({ result: aTok });
  } else {
    res.cookie("rTok", "");
    res.json({ result: "Refresh Token Malformed", status: false });
  }
});


router.post("/checkUsername",(req, res, next)=> {
  console.log(req.body)
  User.findOne({username:req.body.username})
  .then((user)=> {
    if(user) res.json({success:false})
    else res.json({success:true}) 
    })
})
router.post("/checkMobileNumber",(req, res, next)=> {
  User.findOne({mobile_Number:req.body.mobile_Number})
  .then((user)=> {
    if(user) res.json({success:false})
    else res.json({success:true})
    })
})

router.get("/getUserDetails", async (req, res, next) => {
  try {
    resp = await verifyAccessToken(req.headers.authorization.split(" ")[1]);
    userDetail = await User.findById(resp._id);
    res.json(userDetail);
  } catch (error) {
    next(error);
  }
});

router.post('/sendLastLogin', async (req,res,next)=>{
  try {
    userDetail = await User.findById(req.body.user._id);
    lastLogin = await User.findByIdAndUpdate(userDetail._id, {$set:{lastLogin: req.body.lastLogin}})
    res.json(lastLogin);
  } catch (error) {
    next(error);
  }
})

router.get('/logout', (req, res, next)=>{
  res.cookie("rTok", '');
  res.json({success:true})
})
module.exports = router;
