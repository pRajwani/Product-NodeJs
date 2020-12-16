var jwt = require("jsonwebtoken");

exports.createAccessToken = (user) => {
  return jwt.sign(user, "secret");
};

exports.createRefreshToken = (user) => {
  return jwt.sign({ user: user }, "RefreshSecret");
};

exports.verifyAccessToken = (token) => {
  
  return jwt.verify(token, "secret");
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, "RefreshSecret", (err, result)=>{
    if(err!=null){
      return {verify:false};
    }
    else return {result:result.user, verify: true};
  });
};

exports.verifyAccess = (req,res,next) => {
  var token = req.headers.authorization.split(" ")[1]
  var resp = this.verifyAccessToken(token)
  if(resp){
    next();
  }
  else{
    var err = new Error("You are not authorized to perform this opertion!");
        err.status = 403;
        next(err);
        return;
  }
}