const mongoose=require("mongoose");
var Comment=require("./comment");
var User=require("./user");

// mongoose.connect("mongodb://localhost:27017/blog", { useNewUrlParser: true});

var blogSchema= new mongoose.Schema({
    title: String,
    body: String,
 created: { type: Date, default: Date.now},
    author:  {
              id: { 
                      type: mongoose.Schema.Types.ObjectId,
                       ref: "User"
    },
        username: String
        
    },
    comments: [
        {  
                type: mongoose.Schema.Types.ObjectId,
                 ref: "Comment"
        }
        ]
});
console.log("blog model invoked");
module.exports=mongoose.model("Blog", blogSchema);