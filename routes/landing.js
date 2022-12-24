const express = require("express");
const { Account } = require("../models");
const router = express.Router(); 



router.get('/', async (req,res)=>{

   const account = await Account.collection().fetch({
    withRelated: ['role']
})


// console.log(account.toJSON());

// res.json({'results':account.toJSON()})

    res.render('landing/index')
})


router.get('/about-us', (req,res)=>{


    res.render('landing/about-us')
})

router.get('/contact-us', (req,res)=>{


    res.render('landing/contact-us')
})


module.exports = router;