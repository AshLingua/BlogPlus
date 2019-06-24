// authentication and authorization middleware
//
var Blog = require("../models/blog");
var Comment = require("../models/comment");

var middlewareObj = {};
//
//an alternative syntax is: 
// var middlewareObj = {
//     checkCampgroundOwnerShip: function(req,...)
// };

// middlewareObj.isLoggedIn = function(req,res,next) {
//     if(req.isAuthenticated()) {
//         return next();
//     } else {
//     res.render("login", );
//     }
// }

middlewareObj.checkCampgroundOwnership = function(req,res,next) {
    if(req.isAuthenticated()) {
      Campground.findById(req.params.id, function(err, foundCampground) {

        if(err) {
            res.redirect("back");
        } else {
          if(foundCampground.author.id.equals(req.user.id)) {
                    next();
            } else{
                    res.redirect("back");
            } // inner if
        } // oute if
          
      }) // campground find
  }//end isAuthenticated function
}// end function
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){

            if(err) {
               res.redirect("back") 
            } else {
                 if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                  res.redirect("/login")
                }
            }
        })
    } else {
        res.redirect("back")
  }
}
middlewareObj.checkBlogOwnership = function(req,req,next) {
    Blog.findById(req.params.id, function(err, thisCampground) {
        if(thisCampground.author.id.equals(req.user)) {
            return next();
        } else {
            if(isAuthenticated() && (!thisCampground.author.id.equals(req.uer))) {
                req.flash("error", "Please login as the author to edit this blog");
                res.redirect("back");
            }
                req.flash("error", "Please log in to edit your blogs")
                res.redirect("/login")
            }
})

middlewareObj.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    } 
        // req.flash("success", "you've arrived at the login page");
        req.flash("success", "Please login first");
        res.redirect("/login");
    }
}
    //
    //colts
//   isLoggedIn: function(req, res, next){
//         if(req.isAuthenticated()){
//             return next();
//         }
//         req.flash("error", "You must be signed in to do that!");
//         res.redirect("/login");
//     },
    
    
    //
    
    

module.exports= middlewareObj;