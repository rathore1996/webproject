const bcrypt = require("bcryptjs/dist/bcrypt");
const async = require("hbs/lib/async");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const VoterSchema =  new mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     mothername:{
        type:String,
        required:true
     },
     fathername:{
         type:String,
         required:true
     },
     village:{
          type:String,
          required:true,
     },
     pincode:{
            type:Number,
            required:true,
            minlength:05,
            maxlength:07
     },
     post:{
         type:String,
         required:true
     },
     district:{
         type:String,
         required:true
     },
     state:{
         type:String,
         required:true
     },
     phone:{
         type:Number,
         required:true,
         unique:true,
         minlength:09,
         maxlength:11
     },
     email:{
         type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
         }
     },
     password:{
         type:String,
         required:true
     },
     cpassword:{
         type:String,
         required:true
     },
     tokens:[{
         token:{
             type:String,
             required:true
         }
     }]

});

VoterSchema.pre("save", async function(next){
    if(!this.isModified("password")){

    return next()
         }
         this.password = await bcrypt.hash(this.password,10);
         this.cpassword =await bcrypt.hash(this.cpassword,10); 
    next();
});



VoterSchema.methods.generatToken = async function(){
    try{
    const token = jwt.sign({_id:this._id},"mynameispawanprogrammer");
    this.tokens = this.tokens.concat({token:token});
    await this.save(); 
    return token;
    }catch(error){
         console.log(error);
    }

}

const Voter = new mongoose.model("Voter",VoterSchema);
module.exports = Voter;