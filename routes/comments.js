var express=require("express");
var router=express.Router({mergeParams: true});
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var User = require("../models/user");

// for these routes to work, the app.js must have
//      var router=express.Router,
//      var Comment=require("./models/comment");
//      var Blog=require("./models/blog");
//      var blogRoutes=require("./routes/blogs"),
//      var commentRoutes=require("./routes/comments");
//
//  and these app.use settings: 
//      app.use("/blogs", blogRoutes);
//      app.use("/blogs/:id/comments", commentRoutes);
/////////////
//  the model of the parent (in this case, the models/blog.js must have 
//
//      var Comment=require("./comment");
// amd 
//      the comment object reference)
//
//  comments: [
                // {  
                //         type: mongoose.Schema.Types.ObjectId,
                //          ref: "Comment"
                // }
                // ]



//get  a  new comment form
router.get("/new", function(req,res){
  Blog.findById(req.params.id, function(err, blog){
    if(err) {
        console.log(err);
    } else {
    res.render("comments/new", {blog: blog});
    }
  });
});
//
//post a new comment to the selected blog
router.post("/", function(req,res){
    // var newComment = req.body.comment;
    Blog.findById(req.params.id, function(err, blog) {
//  this lookup gives you the id of the campground with which you will associated
//  the comment
        if(err) {
            console.log(err);
            res.redirect("back");

        } else {
        
        Comment.create(req.body.comment, function(err, comment){
           if(err) {
               console.log(err);
               res.redirect("/blogs/" + blog._id);
           } else {
            // for passport:
            //   comment.author.id=req.user._id;
            //   comment.author.username=req.user.username;
            // remember to automate author field in new.ejs as well
             console.log("new comment" + comment);
             blog.comments.push(comment);
//          the push command adds the objectID of the comment  to the comment
//          array in the blogs collection
             blog.save();
//          saves the updated blog
             res.redirect("/blogs/" + blog._id);
           }
        });
        }
    });
});
//GET  comment to edit:

router.get("/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
//(note the first parameter is req.params.comment_id, not comment._id!!!)
    //   console.log("found comments id" + req.params.comment_id);
        if(err) {
            // console.log(err); 
            res.redirect("back");
        }  else {
            res.render("comments/edit", {blog_id: req.params.id, comment: comment})
        }
    })
})
// router.post("/comment_id/edit", function(req,res){
//     Comment.findById(req.params.blog.id, function(err, comment){
//         if(err) {
//             console.log(err);
//             res.redirect("back");
//         } else {
//             res.redirect("/blogs" + req.params.id);
//         }
//     })
// })

//UPDATE COMMENT
router.put("/:comment_id", function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
  // uses req.params.comment_id to find the comment to update, and req.body.comment 
  // contains the form data sent by the client (as delivered by body-parser))
     if(err) {
          console.log(err);
          res.redirect("back");
      } else {
          res.redirect("/blogs/" + req.params.id)
      }
  })
    
})

//DELETE COMMMENT
router.delete("/:comment_id", function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("back");
        
        }
    })
})
module.exports=router;