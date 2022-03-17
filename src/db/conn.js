const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/voterlist-api")
.then(()=>{
    console.log("Connection is successfully created with database voterlist-api  mongodb ");
}).catch((err)=>{
    console.log(err);
});   