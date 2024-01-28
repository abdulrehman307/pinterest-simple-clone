var express = require('express');
var router = express.Router();
var userModel = require('./users');
var postModel = require('./posts');
const passport = require('passport');
const localStrategy = require('passport-local');

passport.use (new localStrategy(userModel.authenticate())) 


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//login 
router.get('/login',async function(req, res, next) {
  await res.render('login');
});
//Feed
router.get('/feed',async function(req, res, next) {
  await res.render('feed');
});
//profile

router.get("/profile",loggedin , async function (req,res,next){
  await res.render('profile');
});
//register
router.post("/register", async   function (req,res){
  const userData = await new userModel({username, email, fullName,} = req.body); //this code reduce by chat gbt
          
  userModel.register(userData,req.body.password).then(function(){
    passport.authenticate('local')(req,res, function(){
   res.redirect('/profile')});
    });
  });
  //login
  router.post('/login', passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/"
  }), function (req, res) {
    // Your code here
  });

  //logout
  router.get('/logout', function(req, res){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

  function loggedin(req,res,next){
    if(req.isAuthenticated())
    {
      return next();
    res.redirect('/login');
  }}
module.exports = router;
