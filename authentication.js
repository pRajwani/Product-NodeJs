const localStrategy = require("passport-local").Strategy;
var passport = require("passport");
var User = require('./models/users');   

//passport.use(new localStrategy(User.authenticate()));
passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser((id, done) => {
  return done(null, id);
});

passport.use(new localStrategy(
  async function(username, password, done) {
    console.log("in the local")
    console.log(typeof(username)=='number')
    console.log(username!=Number)
    if(typeof(username)!='number'){
      console.log("if username is string", username)
      const { user } = await User.authenticate()(username, password);
        return done(null, user);
      }
    else{
      console.log("is username is number")
        User.findOne({ mobile_Number: username }, async function(err, user) {
            console.log('user', user)
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect mobile number  ' });
            }
            if (user) {
              var username = user.username;
              console.log('if usernaem is number', username, password);
              const userget = User.authenticate(username, password, (err, result)=>{
                if(err) {console.log(err); return done(err, null)}
                console.log(result)
                userget = result
              })(username, password)
              console.log(userget)
              return done(null, userget);
            }
          });
    }
    }
));