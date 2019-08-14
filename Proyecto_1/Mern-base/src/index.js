const express = require('express');
const morgan=require('morgan');
const path = require('path');

const {mongoose}=require('./database');

const app =express();

//Settings
app.set('port',process.env.PORT || 3000)

//Middelewares   funciones que se ejecutan antes de 
app.use(morgan('dev'));
app.use(express.json()); //trabajar con los json

//Routes
app.use('/api/post',require('./routes/post.routes'));
app.get('/hi',(req,res)=>{
    res.send('holiwi');
});



//Static files
app.use(express.static(path.join(__dirname,'public')))


//starting server
app.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`);
});
