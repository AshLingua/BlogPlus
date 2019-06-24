var mongoose=require("mongoose");
var Blog=require("./blog");
    
// mongoose.connect("mongodb://localhost:/27017/blog", {useNewUrlParser: true});

var commentSchema = mongoose.Schema ({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
            username: String
    }
});
console.log("comments model invoked");
module.exports = mongoose.model("Comment", commentSchema);
