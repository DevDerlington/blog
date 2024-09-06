//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "I am Alexander Oluwafikunayomi Olamide Darocha, the first of her name and the great grand child of the one and only Darocha. I'm in JSS3, I attend MATE junior High School. I am loquacious, i dont like to read accept am forced to, But i intend to turn a new leave.Hence, why i will be keeping a journal.";
const aboutContent = "Little had been said about me on the home page,it was earlier stated that i am in JSS3, i am at one of the biggest impass of my life,Ireally dont know the department to join when i will be done with JSS3, either Science, Art or Commercial, i hope and pray am able to resolve this before next year, Personally i have potentials to become a lot of things as i am very vast(atleast everyone around me say that),.";
const contactContent = "Follw me on all socials @ Fikun_Darocha, I reside at Adebayo Street,Alapere,Ketu,Lagos,Nigeria.";

mongoose.connect("mongodb://127.0.0.1:27017/BlogDB114");
const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = {
  title: String,
  content : String
};

const Post = mongoose.model("Post", postSchema);

// 

app.get("/", function(req, res){
  Post.find({}).then((posts)=>{
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
 

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

 post.save();

  res.redirect("/");

});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id:requestedPostId}).then((post)=>{
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
