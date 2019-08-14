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

router.post('/',async(req,res) =>{
    const {username,title,description}=req.body;
    const post=new Post({username,title,description
    });
    await post.save();
    console.log(post);
    res.json('Tarea Guardada');
});

router.put('/:id',async(req,res)=>{
    const {username,title,description}=req.body;
    const newPost={username,title,description};
    await Post.findByIdAndUpdate(req.params.id,newPost);
    res.json({status:'Tarea editada'});

})
router.delete('/:id',async(req,res)=>{
    await Post.findByIdAndRemove(req.params.id);
    res.json({status:'Tarea eliminada'});
});



module.exports=router;