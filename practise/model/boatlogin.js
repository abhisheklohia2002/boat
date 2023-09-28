const mongoose = require('mongoose');
const boatLogin= mongoose.Schema({
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

const boatLoginModels = mongoose.model("login_boat",boatLogin);
module.exports = boatLoginModels;
