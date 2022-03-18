//required things

const path = require("path");
// const bcrypt = require("bcryptjs/dist/bcrypt");
const bcrypt = require("bcryptjs");
const Voter = require("./models/collection");
const jwt = require("jsonwebtoken");
const express = require("express");
const hbs = require("hbs");
const staticPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../views/partials");
const res = require("express/lib/response");
require("./db/conn");
const cookieParser = require("cookie-parser");
const auth = require("./middeleware/auth");
const async = require("hbs/lib/async");
//port assing for server
const port = process.env.PORT || 8000;

 //direction for express what to do
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.set("view engine", "hbs");
app.use(express.static(staticPath));
hbs.registerPartials(partialPath);

//  get requests for pages
app.get("/home", (req, res) => {
    res.render("home.hbs");
});
app.get("/aboute",(req,res)=>{
    res.render("aboute.hbs");
});
app.get("/joinus",(req,res)=>{
    res.render("join.hbs");
});
app.get("/login",(req,res)=>{
    res.render("login.hbs");
});

app.get("/contact",(req,res)=>{
    res.render("contact.hbs");
});

app.get("/logout",auth,async (req,res)=>{
    try{
          req.user.tokens=[];
        res.clearCookie("jwt");
       await req.user.save();
        res.render("login.hbs");
        console.log("logout successfully");
    }catch(err){
        console.log(err);
        // res.status(500).send(err);
    }
});
app.get("/myprofile" ,auth, (req,res)=>{
    res.render("services.hbs");
});
app.get("/update",auth,(req,res)=>{
    res.render("update.hbs");
})
app.get("/updateinfo",auth,async(req,res)=>{
    res.render("updateinfo.hbs");
})
// GET REQUESTS FOR API

app.get("/voter/:id",async(req,res)=>{
    const _id = req.params.id;
           const voterData = await Voter.findById(_id);
           res.send(voterData);
});
app.get("/voter", async (req, res) => {
    try {
        const result = await Voter.find();
        res.send(result);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
});

app.get("/search/:key",async(req,res)=>{
    const key =req.params.key;
    const data = await Voter.find({
       $or:[
           {name:key},
           {phone:key},
           {email:key}
       ]
    })
    res.send(data);
})


    // POST REQUEST FOR API FROM POSTMAN
app.post("/voter", async (req, res) => {
    try {
        const user = new Voter(req.body);
        console.log(user);
        const creatVoter = await user.save();
        res.status(201).send(creatVoter);

    } catch (err) {
        console.log(err);
    }
});
// POST REQUESTS FOR API FROM WEBPAGE
app.post("/register", async(req,res)=>{
    try{
        const PASSWORD = req.body.password;
        const CPASSWORD = req.body.cpassword;
        if(PASSWORD===CPASSWORD){
        const newvoter = new Voter({
            name:req.body.name,
            mothername:req.body.mothername,
            fathername:req.body.fathername,
            village:req.body.village,
            pincode:req.body.pincode,
            post:req.body.post,
            district:req.body.district,
            state:req.body.state,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password,
            cpassword:req.body.cpassword
        });

   const token = await newvoter.generatToken();
     res.cookie("jwt",token,{
         expires: new Date(Date.now() + 30000),
         httpOnly:true
     });
    
        const creatVoter = await newvoter.save();
        // console.log(creatVoter);
        res.send(creatVoter);
        // res.status(201).render("login.hbs");
    }else{
        res.send("information dosen't match");
    }
    }catch(err){
        console.log(err);
        res.send(`ther is some err ${err}`);
    }
});
app.post("/login", async (req,res)=>{
    try{
        const phonenumber = req.body.phone;
       const password = req.body.password;
        const voterlogin = await Voter.findOne({phone:phonenumber});
      const isMatch = await bcrypt.compare(password,voterlogin.password);
           const token = await  voterlogin.generatToken();    
          res.cookie("jwt",token,{
            expires: new Date(Date.now() + 300000),
            httpOnly:true
        });
        if(password===voterlogin.password){
            res.render("afterlogin.hbs",{
                username:voterlogin.name
            });
        }else
           if(isMatch){
            //    res.render("home.hbs");
            // res.send(voterlogin);
            //    res.render("afterlogin.hbs");
            res.render("afterlogin.hbs",{
                username:voterlogin.name
            });
           }else{
               res.render("update.hbs");
           }
    }catch(e){
        console.log(e);
    }
});
//PATCH REQUEST FOR API FROM POSTMAN
app.patch("/voter/:id", async (req,res)=>{
    try{
        const _id = req.params.id;
        const updateUser = await Voter.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updateUser);
        
    }catch(e){
        console.log(e);
    }
});


    app.post("/updatepassword",async function(req,res){
        try{
            
            const data = await Voter.findOne({phone:req.body.phone})
                if(data.name===req.body.name){
                    if(req.body.password===req.body.cpassword){
                  const updatedUser = await Voter.findByIdAndUpdate(data._id,{
                      password:req.body.password,
                      cpassword:req.body.cpassword
                  },{new:true});
                   res.send(updatedUser);
                }else{
                    console.log("psw is not matching");
                }
                }else{
                    console.log("err")
                }

        }  catch(err){
            console.log(err);
        }

    })

    app.post("/updateinfo", async (req,res)=>{
            const data = await Voter.find({token:req.cookies});

    });


// DELETE REQUEST FOR API FROM POSTMAN
app.delete("/voter/:id", async(req,res)=>{
    try{
    const _id = req.params.id;
    const deletedUser = await Voter.findByIdAndDelete(_id);
    res.send(deletedUser);
    }catch(e){
       console.log(e);
    }
});



app.listen(port, () => {
    console.log(`server is created on port no ${port}`);
});  