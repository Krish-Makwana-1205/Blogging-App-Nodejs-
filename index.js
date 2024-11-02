const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;
const userroute = require("./routes/user");
const cookieparser = require("cookie-parser");


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.get("/", (req, res)=>{
    res.render("home");
});
mongoose.connect("mongodb://localhost:27017/lambeblog").then((e)=>console.log("bank up"));
app.use("/user", userroute);
app.listen(PORT, ()=>{
    console.log(`I just got hold of the syntax!!! Also the port is ${PORT}`);
});
 
