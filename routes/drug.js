const express = require('express');
const Drug = require('../models/Drug');
const router = express.Router();
const mangoose = require('mongoose')

router.get('/',async (req,res)=>{
    const drugs = await Drug.find().sort({name:'asc'})
    res.render('drugs/drugs', { drugs: drugs})
})

router.get('/add',(req,res)=>{
    res.render('drugs/addDrugs',{drug: new Drug()})
});
router.get('/edit/:id',async(req,res)=>{
    const drug = await Drug.findById(req.params.id)
    res.render('drugs/edit',{drug:drug})
});

router.get('/:id',async (req,res)=>{
    const drug = await Drug.findById(req.params.id)
    if(drug == null){
        res.redirect('/')
    } else{
        res.render('drugs/show',{drug:drug})
    }
})

router.post('/', async (req,res,next)=>{
    let drug = new Drug({
        name:req.body.name,
        brandName:req.body.brand,
        uses:req.body.uses,
        adverseEffects:req.body.adverseEffects,
        markdown:req.body.markdown
    })
    try {
        drug = await drug.save()
        res.redirect(`/drugs/${drug.id}`)
    }catch (e){
        res.render('drugs/addDrugs',{drug:drug})
        console.log(e)
    }
    next()
})
router.put('/:id',async(req,res,next)=>{
    let drug = await Drug.findById(req.params.id)
        drug.name=req.body.name,
        drug.brandName=req.body.brand,
        drug.uses=req.body.uses,
        drug.adverseEffects=req.body.adverseEffects,
        drug.markdown=req.body.markdown
    try {
        drug = await drug.save()
        res.redirect(`/drugs/${drug.id}`)
    }catch (e){
        res.render('drugs/edit',{drug:drug})
        console.log(e)
    }
    next()
})
router.delete('/:id', async(req,res)=>{
    await Drug.findByIdAndDelete(req.params.id)
    res.redirect('/drugs')
})

module.exports = router;