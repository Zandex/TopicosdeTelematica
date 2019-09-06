const express = require('express');
const router = express.Router();

const Post=require('../models/post');
//----------------------------------------------------variable para SEGURIDAD-------------------------------
const users=require('../models/users');

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
    const {username,title,description,creator,date}=req.body;
    const post=new Post({username,title,description,creator,
    date});
    await post.save();
    //console.log(post);
    res.json('Tarea Guardada');
});

router.put('/:id',async(req,res)=>{
    const {username,title,description,creator,date}=req.body;
    const newPost={username,title,description,creator,date};
    await Post.findByIdAndUpdate(req.params.id,newPost);
    res.json({status:'Tarea editada'});

})
router.delete('/:id',async(req,res)=>{
    await Post.findByIdAndRemove(req.params.id);
    res.json({status:'Tarea eliminada'});
})

// ---------------------------------------------------------------- INICIO SEGURIDAD------------------------------------------
router.post('/users/login',async(req,res)=>{
    try {
        const user = req.body._id;
        const password = req.body.password;
        console.log("New request: body:",req.body)
        let busqueda = await users.findOne({_id:user})
        console.log("busqueda")
        console.log(busqueda)
        if (busqueda["password"] == password) {
            console.log("usuario verificado correctamente")
            res.json('valid')
        } else {
            console.log("contraseña incorrecta")
            res.json('invalid')
        }

    } catch (err) {
        console.log("usuario no encontrado")
        console.log('Error: '+ err);
        res.json('invalid')
    }
})

router.post('/users/register',async(req,res)=>{
    try {
        const {_id, password}=req.body;
        console.log("New request: body:",req.body)
        const user=new users({_id, password});
        let saveUser= await user.save();
        console.log(saveUser);
        res.json('valid');
    } catch (err) {
        console.log("Error: " + err)
        res.json('invalid');
    }
});

// ---------------------------------------------------------------- FIN SEGURIDAD------------------------------------------


module.exports=router;