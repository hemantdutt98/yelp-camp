var express = require("express")
var app = express();
var bodyparser= require("body-parser")
app.use(bodyparser.urlencoded({extended:true}))

app.set("view engine", "ejs")

var campgrounds = [
        {name:"aakash", image:"https://www.photosforclass.com/download/pb_1846142"},
        {name:"anil", image:"https://www.photosforclass.com/download/pb_4817872"},
        {name:"aman", image:"https://www.photosforclass.com/download/pb_3893587"},
        {name:"aakash", image:"https://www.photosforclass.com/download/pb_1846142"},
        {name:"anil", image:"https://www.photosforclass.com/download/pb_4817872"},
        {name:"aman", image:"https://www.photosforclass.com/download/pb_3893587"}
    ]

app.get("/",(req,res)=>{
    res.render("landing")
})
app.get("/campgrounds",(req,res)=>{
    res.render("campgrounds",{campgrounds:campgrounds})
})
app.post("/campgrounds",(req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var campground = {name:name,image:image}
    campgrounds.push(campground);
    res.redirect("/campgrounds")
})
app.get("/campgrounds/new",(req,res)=>{
    res.render("new.ejs")
})
app.listen(80,()=>{
    console.log("yelp server has been satrted")
})