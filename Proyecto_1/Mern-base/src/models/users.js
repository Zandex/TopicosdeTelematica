//-------------------------------------------------INICIO SEGURIDAD---------------------------
const mongoose=require('mongoose');
const {Schema} = mongoose;

const usersSchema=new Schema({
    _id:{type:String,require:true},
    password:{type:String,require:true}
})

module.exports =mongoose.model('users',usersSchema);
//----------------------------------------------------FIN SEGURIDAD-------------------------------