const mongoose = require('mongoose');
const marked = require('marked')
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
 
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

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
    },
    markdown:{
        type: String,
        required:true
    },
    sanitizedHtml:{
        type:String,
        required:true
    }
})
drugSchema.pre('validate',function(next){
    if(this.markdown){
        this.sanitizedHtml = DOMPurify.sanitize(marked(this.markdown))
    }
    next()
})


const Drug = mongoose.model('Drug',drugSchema);
module.exports = Drug;