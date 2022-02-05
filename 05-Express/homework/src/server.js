const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
//server.use(bodyParser.urlencoded({ extended: false }))

// TODO: your code to handle requests

var count = 0;

server.get("/", function(req, res){
    res.status(200)
    res.send(posts)
})

server.get("/posts", function(req, res){
   if(req.query.term){
       var v = req.query.term;
       return res.json(posts.filter(p => p.title.includes(v) ||  p.contents.includes(v)))
    }else{
    res.status(200)
    res.json(posts)
    }
})

server.post("/posts", function(req, res){
    if(req.body.title && req.body.contents){
        var post= {title: req.body.title, contents: req.body.contents, id: count++}
        posts.push(post); 
        res.status(200)
        res.json(post)
    }else{
        res.status(422)
        res.send({"error": "No se recibieron los parámetros necesarios para crear el Post"})
    }  
    
})

server.put("/posts", function(req, res){
    if(req.body.title && req.body.contents && req.body.id){
        var cid = posts.find(p => p.id === req.body.id);
        if(!cid) return res.status(422).send({"error": "No existe ese Id!"})
        cid.title = req.body.title;
        cid.contents = req.body.contents;
        res.status(200)
        res.json(cid)
    }else{
        res.status(422)
        res.send({"error": "No se recibieron los parámetros necesarios para modificar el Post"})
    }  
    
})

server.delete("/posts", function(req, res){
    if(req.body.id){
        var cid = posts.find(p => p.id === req.body.id);
        if(!cid) return res.status(422).send({"error": "No existe ese Id!"})
        posts = posts.filter(p => p.id !== req.body.id)
        res.status(200)
        res.json({success: true})
    }else{
        res.status(422)
        res.send({"error": "No se recibieron los parámetros necesarios para modificar el Post"})
    }  
    
})

module.exports = { posts, server };
