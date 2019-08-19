const mongoose =require('mongoose');

//const URI ='mongodb://localhost/mern-post'
const URI ='mongodb://mongo-server/ProyectoMERN';

//sudo fuser -k 3000/tcp para error 

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.err(err));

module.export =mongoose;