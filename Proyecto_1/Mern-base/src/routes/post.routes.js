const express = require('express');
const router = express.Router();

const Post=require('../models/post');
//----------------------------------------------------variable para SEGURIDAD-------------------------------
const users=require('../models/users');
var bcrypt = require('bcrypt');

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
        var hashPassword = async function(){
            const {_id, password}= req.body;
            let hash = await users.findOne({_id:_id})
            await bcrypt.compare(password, hash["password"], function(err, resp) {
                if (resp){
                    console.log("usuario verificado correctamente")
                    res.json('valid')
                } else {
                    console.log("contraseña incorrecta")
                    res.json('invalid')
                }
            }); 
        }
        hashPassword();
    } catch (err) {
        console.log("usuario no encontrado")
        console.log('Error: '+ err);
        res.json('invalid')
    }
})

router.post('/users/register',async(req,res)=>{
    try {

        var hashPassword = async function(){
            await bcrypt.genSalt(8, function(err, salt) {
                bcrypt.hash(req.body["password"], salt, function(err, hash) {
                    req.body["password"] = hash
                    const {_id, password}= req.body;
                    const user=new users({_id, password});
                    let saveUser= user.save();
                    console.log(saveUser);
                    res.json('valid');
                });
            });
        }
        hashPassword();
    } catch (err) {
        console.log("Error: " + err)
        res.json('invalid');
    }
});

// ---------------------------------------------------------------- FIN SEGURIDAD------------------------------------------


module.exports=router;