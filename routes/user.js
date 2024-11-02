const {Router} = require('express');
const user = require("../models/user");

const router = Router();

router.get("/signup", (req, res)=>{
    res.render("signup");
});

router.get("/signin", (req, res)=>{
    res.render("signin");
});

router.post("/signin",async (req, res)=>{
    const{email,password} = req.body;
    try{
    const token = await user.matchpassword(email, password);
    console.log(token);
    res.cookie("token", token).redirect("/");
}
    catch(error){
        return res.render('signin', {
            error: "Incorrect password or email",
        })
    }
    
})
router.post("/signup", async (req, res)=>{
    console.log(req.body);
    console.log(user);
    const {Fullname, email, password} = req.body;
    await user.create({
        fullname:Fullname,
        email:email,
        password:password
    });
    return res.redirect("/");
});
 
module.exports = router;
