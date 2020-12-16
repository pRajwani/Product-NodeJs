var express = require('express');
var router = express.Router();
var Products = require('../models/products')
var jwt = require('../services/jwt')

router.route('/')
.get(jwt.verifyAccess, async(req, res, next)=>{
   var products = await Products.find({})
   res.json(products);
})
.post(async(req, res, next)=>{
    var product = await Products.create(req.body);
    res.json(product);
})
.put(async(req, res, next)=>{
    var product = await Products.findByIdAndUpdate(req.body._id, {$set:req.body})
    res.json(product);
})

router.route('/:id')
.delete(async(req, res, next)=>{
    console.log(req.body)
    var product = await Products.findByIdAndRemove(req.params.id)
    res.json(product);
})
module.exports = router;