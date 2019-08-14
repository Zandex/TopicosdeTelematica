const mongoose =require('mongoose');

const URI ='mongodb://localhost/mern-post'

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.err(err));

module.export =mongoose;