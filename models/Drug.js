const mongoose = require('mongoose');
const drugSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brandName:{
        type:String
    },
    uses:{
        type:[String],
        required:true
    },
    adverseEffects:{
        type:[String]
    }
})

const Drug = mongoose.model('Drug',drugSchema);
module.exports = Drug;