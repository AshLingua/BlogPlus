var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

// mongoose.connect=("mongodb://localhost:/27017/blog", {useNewUrlParser: true});

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
// note that UserSchemas MUST be capitalized for this to work

UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User", UserSchema);