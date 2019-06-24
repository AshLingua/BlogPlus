var express=require("express");
var router=express.Router();
var Blog = require("../models/blog");


router.get("/", function(req,res){
    res.render("landing");
});

module.exports=router;
