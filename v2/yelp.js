var express   = require("express");
var app       = express();
var bodyparser= require("body-parser");
var mongoose  = require("mongoose");

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs")

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

var capgroundSchema = new mongoose.Schema({
    name : String ,
    image : String,
    description: String
});

var Campground = mongoose.model("Campground",capgroundSchema);

// Campground.create({
//     name:"aakash", 
//     image:"https://www.photosforclass.com/download/pb_1846142" 
// }, function (error,campground) {
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log("newly created campground")
//         console.log(campground);
//     }
// });




app.get("/",(req,res)=>{
    res.render("landing")
})
app.get("/campgrounds",(req,res)=>{
    Campground.find({},function (error,allCampgrounds) {
        if(error){
            console.log(error)
        } else{
            res.render("campgrounds",{campgrounds:allCampgrounds})
        }
    })
})
app.post("/campgrounds",(req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.Description;
    var newCampground = {name:name,image:image,description:desc}
    
    Campground.create(newCampground , function (error,campground) {
    if(error){
        console.log(error)
    }
    else{
        console.log("newly created campground")
        console.log(campground);
    }
});

    res.redirect("/campgrounds")
})
app.get("/campgrounds/new",(req,res)=>{
    res.render("new")
})
app.get("/campgrounds/:id",(req,res)=>{
    Campground.findById(req.params.id,(error,foundCampground)=>{
        if(error){
            console.log(error)
        } else{
                 res.render("info",{x:foundCampground}) 
        }
    })
   
})
app.listen(80,()=>{
    console.log("yelp server has been satrted")
})