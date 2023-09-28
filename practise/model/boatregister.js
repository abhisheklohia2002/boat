const mongoose = require('mongoose');
const boatregister= mongoose.Schema({
    name:{
        type:String,
        
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true, 
        trim: true, 
        lowercase: true, 
    },
    password:{
        type:String,
        required:true
    },

},
{
    timestamps:true
})

const boatModels = mongoose.model("register_boat",boatregister);
module.exports = boatModels;
