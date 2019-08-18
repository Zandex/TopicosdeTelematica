const express = require('express');
const router = express.Router();

const Post=require('../models/post');

router.get('/',async(req,res) =>{
    const post=await Post.find();
    res.json(post)
});

router.get('/:id',async(req,res) =>{
    const post=await Post.findById(req.params.id);
    res.json(post);
});

router.get('/title/:title',async(req,res) =>{
    const ti=req.params.title;
    const post=await Post.find({title:ti });
    //console.log(post);
    res.json(post);
});
router.get('/forums/:st',async(req,res) =>{
    const ti=req.params.st;
    const post=await Post.find({creator:ti});
    res.json(post);
});

router.post('/',async(req,res) =>{
    const {username,title,description,creator}=req.body;
    const post=new Post({username,title,description,creator
    });
    await post.save();
    //console.log(post);
    res.json('Tarea Guardada');
});

router.put('/:id',async(req,res)=>{
    const {username,title,description,creator}=req.body;
    const newPost={username,title,description,creator};
    await Post.findByIdAndUpdate(req.params.id,newPost);
    res.json({status:'Tarea editada'});

})
router.delete('/:id',async(req,res)=>{
    await Post.findByIdAndRemove(req.params.id);
    res.json({status:'Tarea eliminada'});
});



module.exports=router;