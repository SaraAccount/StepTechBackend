const mongoose=require('mongoose');
const loginSchema=mongoose.Schema({
    name:
    {type:'string'},
    password:
    {type:'string'},
    seminar:
    {type:'string'},
    email:
    {type:'string'},
}) 
module.exports=mongoose.model('Login',loginSchema);