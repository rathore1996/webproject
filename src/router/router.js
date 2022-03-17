// //requiring required things
// const bcrypt = require("bcryptjs/dist/bcrypt");
// const express = require("express");
// const { route } = require("express/lib/application");
// const async = require("hbs/lib/async");
// const app = express();
// const Voter = require("../models/collection");
// const jwt = require("jsonwebtoken");
// const { cookie } = require("express/lib/response");
// const cookieParser = require("cookie-parser");
// app.use(cookieParser);
// // defining router
// const router = new express.Router();
// router.use(express.json());

// router.use(express.urlencoded({extended:false}));
// // GET REQUESTS
// router.get("/home", (req, res) => {
//     res.render("home.hbs");

// });
// router.get("/aboute",(req,res)=>{
//     res.render("aboute.hbs");
// });
// router.get("/joinus",(req,res)=>{
//     res.render("join.hbs");
// });
// router.get("/login", (req,res)=>{
//     res.render("login.hbs");
// });
// router.get("/services" , (req,res)=>{
//     res.render("services.hbs");
// });
// // GET REQUESTS FOR API
// router.get("/logout",(req,res)=>{
//     res.render("home.hbs");
// });
// router.get("/voter/:id",async(req,res)=>{
//     const _id = req.params.id;
//            const voterData = await Voter.findById(_id);
//            res.send(voterData);
// });
// router.get("/voter", async (req, res) => {
//     try {
//         const result = await Voter.find();
//         res.send(result);
//         console.log(result);
//     } catch (err) {
//         console.log(err);
//     }
// });


//     // POST REQUEST FOR API FROM POSTMAN
// router.post("/voter", async (req, res) => {
//     try {
//         const user = new Voter(req.body);
//         console.log(user);
//         const creatVoter = await user.save();
//         res.status(201).send(creatVoter);

//     } catch (err) {
//         console.log(err);
//     }
// });
// // POST REQUESTS FOR API FROM WEBPAGE
// router.post("/register", async(req,res)=>{
//     try{
//         const PASSWORD = req.body.password;
//         const CPASSWORD = req.body.cpassword;
//         if(PASSWORD===CPASSWORD){
//         const newvoter = new Voter({
//             name:req.body.name,
//             mothername:req.body.mothername,
//             fathername:req.body.fathername,
//             village:req.body.village,
//             pincode:req.body.pincode,
//             post:req.body.post,
//             district:req.body.district,
//             state:req.body.state,
//             phone:req.body.phone,
//             email:req.body.email,
//             password:req.body.password,
//             cpassword:req.body.cpassword
//         });

//    const token = await newvoter.generatToken();
//      res.cookie("jwt",token,{
//          expires: new Date(Date.now() + 30000),
//          httpOnly:true
//      });
//      console.log(cookie);
//         const creatVoter = await newvoter.save();
//         // console.log(creatVoter);
//         res.send(creatVoter);
//         // res.status(201).render("login.hbs");
//     }else{
//         res.send("information dosen't match");
//     }
//     }catch(err){
//         console.log(err);
//         res.send(`ther is some err ${err}`);
//     }
// });
// router.post("/login", async (req,res)=>{
//     try{
//         const phonenumber = req.body.phone;
//        const password = req.body.password;

//         const voterlogin = await Voter.findOne({phone:phonenumber});
//           const isMatch = await bcrypt.compare(password,voterlogin.password);
//            const token = await voterlogin.generatToken();
//           console.log(token);
//           res.cookie("jwt",token,{
//             expires: new Date(Date.now() + 30000),
//             httpOnly:true
//         });
//            if(isMatch){
//                res.send(voterlogin);
//             //    res.render("afterlogin.hbs");
//            }else{
//                res.send("password missing");
//            }
//     }catch(e){
//         console.log(e);
//     }
// });

// //PATCH REQUEST FOR API FROM POSTMAN
// router.patch("/voter/:id", async (req,res)=>{
//     try{
//         const _id = req.params.id;
//         const updateUser = await Voter.findByIdAndUpdate(_id,req.body,{
//             new:true
//         });
//         res.send(updateUser);
        
//     }catch(e){
//         console.log(e);
//     }
// });
// // DELETE REQUEST FOR API FROM POSTMAN
// router.delete("/voter/:id", async(req,res)=>{
//     try{
//     const _id = req.params.id;
//     const deletedUser = await Voter.findByIdAndDelete(_id);
//     res.send(deletedUser);
//     }catch(e){
//        console.log(e);
//     }
// });



// module.exports = router;