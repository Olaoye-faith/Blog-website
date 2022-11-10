const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

const homestartingcontent =  "orem ipsum dolor sit amet consectetur adipisicing elit.Id sequi totam vel facere,odio fugit architecto similique vitae eveniet hic magni doloremque expedita! Consequatur quis natus reiciendis quam deserunt nesciunt deleniti nam quo error molestias, atque eum repudiandae iusto sint esse! Optio autem alias corrupti assumenda provident, perferendis dicta? Repellat ex doloremque, hic nam tempore odio facilis, error velit consequatur earum"  

const aboutcontent =  "orem ipsum dolor sit amet consectetur adipisicing elit.Id sequi totam vel facere,odio fugit architecto similique vitae eveniet hic magni doloremque expedita! Consequatur quis natus reiciendis quam deserunt nesciunt deleniti nam quo error molestias, atque eum repudiandae iusto sint esse! Optio autem alias corrupti assumenda provident, perferendis dicta? Repellat ex doloremque, hic nam tempore odio facilis, error velit consequatur earum"   

const contactcontent =  "orem ipsum dolor sit amet consectetur adipisicing elit.Id sequi totam vel facere,odio fugit architecto similique vitae eveniet hic magni doloremque expedita! Consequatur quis natus reiciendis quam deserunt nesciunt deleniti nam quo error molestias, atque eum repudiandae iusto sint esse! Optio autem alias corrupti assumenda provident, perferendis dicta? Repellat ex doloremque, hic nam tempore odio facilis, error velit consequatur earum"   

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let posts = [];

app.get("/", function(req,res){
    res.render("home", {
        startingcontent:homestartingcontent,
        posts:posts
    });
    console.log(posts);
});

app.get("/about", function(req,res){
    res.render("about", {aboutcon:aboutcontent});
});

app.get("/contact", function(req,res){
    res.render("contact", {contactcon:contactcontent});
});

app.get("/compose", function(req,res){
    res.render("compose");
});

app.post("/compose", function(req,res){
    const post = {
        title: req.body.posttitle,
        content: req.body.postbody
    };

    posts.push(post);

    res.redirect("/");
});

app.get("/posts/:postname", function(req,res){
    const requestedpost = _.lowerCase(req.params.postname);

    posts.forEach(function(post){
        const storedtitle = _.lowerCase(post.title);

        if(storedtitle === requestedpost){
            res.render("posts", {
                title: post.title,
                content: post.content
            })
        }
    });
})

app.listen(3000, function(req,res){
    console.log("Server started on port 3000");
});