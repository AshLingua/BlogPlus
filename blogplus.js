var express=require("express"),
     app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    methodOverride=require("method-override"),
    flash=require("connect-flash"),
    router=express.Router,
    passport=require("passport"),
    passportLocalMongoose=require("passport-local-mongoose"),
    LocalStrategy=require("passport-local"),
    User=require("./models/user"),
    Comment=require("./models/comment"),
    Blog=require("./models/blog"),
    indexRoutes=require("./routes/index"),
    blogRoutes=require("./routes/blogs"),
    commentRoutes=require("./routes/comments");

    // expressSanitizer=require("express-sanitizer")
//connect to mongoose
mongoose.connect("mongodb://localhost:27017/blog2",{ useNewUrlParser: true });

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
// app.use(expressSanitizer);
//use flash --
//  flash depends on passport app.use req.success and req.error
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);
app.use("/", indexRoutes);

//define the schema
// var blogSchema = new mongoose.Schema({

// title: String,
// image: String,
// body: String,
// created: {type: Date, default: Date.now},
// author: [ {
//         id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//         }
//         }]
// });
// // make the db variable
// var Blog = mongoose.model("Blog", blogSchema);

app.use(require("express-session")({
  secret: "plus ca change",
  resave: false,
  saveUnitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// used by ...middleware/index.js for authentication and header for message display; all .ejs
// templates for conditional diplay of edit and delete buttons
app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    // res.locals.info=req.flash("info");
    next();

})
// ?? where is 'indexRoutes' defined >> app.use("/", indexRoutes);


//ROUTES

//test blog

app.listen(3000, function() {
    console.log("serving Blog app okay");
})
