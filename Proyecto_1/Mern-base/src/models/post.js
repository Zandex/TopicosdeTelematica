const mongoose=require('mongoose');
const {Schema} = mongoose;

const PostSchema=new Schema({
    username:{type:String,require:true},
    title:{type:String,require:true},
    description:{type:String,requiered:true}
})

module.exports =mongoose.model('Post',PostSchema);