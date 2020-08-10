const express = require('express');
const Drug = require('../models/Drug');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('drugs/drugs')
})

router.get('/add',(req,res)=>{
    res.render('drugs/addDrugs',{drug: new Drug()})
});

router.post('/',(req,res)=>{
    res.send('hi')
})

module.exports = router;