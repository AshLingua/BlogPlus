var express=require("express");
var Blog=require("../models/blog");
var router=express.Router();
var middleware=("../middleware/index.js");



// router.get("/", function(req, res){
//     res.render("landing");
// });
// router.get("/", function(req,res){
//     res.redirect("/blogs");
// })

router.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index.ejs", {blogs: blogs}); 
        }
    })
});

// define the routes


// //NEW
router.get("/new", function(req,res){
    res.render("blogs/new");

});
// create
router.post("/", function(req,res){
    //  req.body.blog.body = req.sanitize(req.body.blog.body);
//   var formData = req.body.blog;
  Blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            console.log("create error: " + err);
            res.render("blogs/new");
        } else {
            res.redirect("/blogs");
        }

    });
});
// SHOW A BLOG and its commments
router.get("/:id", function(req,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, blog){
      if(err) { console.log(err) ;
      } else {

    res.render("blogs/show", {blog: blog});
    // console.log("show page result" + {blog: blog.comments})
      }
      })
})
//edit
router.get("/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        } else {


        res.render("blogs/edit", {blog: foundBlog})
        }
    })
})
//update
router.put("/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err,blog){
        if(err) {
            console.log("error: " + err)
        } else {
            console.log("blog id:  " + blog._id);
            var showUrl="/blogs/" + blog._id;
            console.log(showUrl);
            res.redirect(showUrl)
        }
    })
})

// delete
// try also: Blog.findByIdAndRemove(req.parames.id, function(err, blog...)
router.delete("/:id", function(req,res){
  Blog.findById(req.params.id, function(err,blog){
      if(err) {
          console.log(err)
      } else {
          blog.remove();
          res.redirect("/blogs")
      }
  })

})
module.exports=router;
