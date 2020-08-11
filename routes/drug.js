const express = require('express');
const Drug = require('../models/Drug');
const router = express.Router();
const mangoose = require('mongoose')

router.get('/', (req,res)=>{
    const drugs = [{
        name: 'Sumatriptan',
        brandName: 'Imitrex ',
        uses: 'Sumatriptan is effective for ending or relieving the intensity of migraine and cluster headaches.',
        adverseEffects: 'Serious cardiac events, including some that have been fatal, have occurred following the use of sumatriptan injection or tablets. Events reported have included coronary artery vasospasm, transient myocardial ischemia, myocardial infarction, ventricular tachycardia, and ventricular fibrillation (V-Fib).'
    },{
        name: 'jos',
        brandName: 'Imitrex ',
        uses: 'Sumatriptan is effective for ending or relieving the intensity of migraine and cluster headaches.',
        adverseEffects: 'Serious cardiac events, including some that have been fatal, have occurred following the use of sumatriptan injection or tablets. Events reported have included coronary artery vasospasm, transient myocardial ischemia, myocardial infarction, ventricular tachycardia, and ventricular fibrillation (V-Fib).'
    }
    ]
    res.render('drugs/drugs', { drugs: drugs})
})

router.get('/add',(req,res)=>{
    res.render('drugs/addDrugs',{drug: new Drug()})
});

router.get('/:id',async (req,res)=>{
    const drug = await Drug.findById(req.params.id)
    if(drug == null){
        res.redirect('/')
    } else{
        res.render('drugs/show',{drug:drug})
    }
})

router.post('/', async (req,res)=>{
    let drug = new Drug({
        name:req.body.name,
        brandName:req.body.brand,
        uses:req.body.uses,
        adverseEffects:req.body.adverseEffects
    })
    try {
        drug = await drug.save()
        res.redirect(`/drugs/${drug.id}`)
    }catch (e){
        res.render('drugs/addDrugs',{drug:drug})
    }
    
})

module.exports = router;