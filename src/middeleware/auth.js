const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");
const Register = require("../models/collection");
const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
      const varifyUser = jwt.verify(token,"mynameispawanprogrammer");
    //   console.log(varifyUser);
      const user = await Register.findOne({_id:varifyUser._id});
    //   console.log(user);
      req.token =token;
      req.user = user;
      next();        

    }catch(errore){
        res.status(401).send(errore);
    }
}



module.exports = auth;