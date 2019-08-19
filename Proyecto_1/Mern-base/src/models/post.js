const mongoose=require('mongoose');
const {Schema} = mongoose;

const PostSchema=new Schema({
    username:{type:String,require:true},
    title:{type:String,require:true},
    description:{type:String,requiered:true},
    creator:{type:Boolean,required:true},
    date:{type:Date,required:true}
})

module.exports =mongoose.model('Post',PostSchema);