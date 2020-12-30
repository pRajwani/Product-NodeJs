const express = require('express')
const router = express.Router();
const PwaTesting = require('../models/PwaTesting')


router.route('/')
.get((req, res, next) => {
    PwaTesting.find({})
    .then((resp)=> {
        res.json(resp);
    }, (err)=> next(err))
    .catch((err)=>{
        next(err);
    })
})
.post((req, res, next)=>{
    PwaTesting.create(req.body)
    .then((resp)=> {
        res.json(resp);
    }, (err)=> {next(err)})
    .catch((err)=> {
        next(err);
    })
})

module.exports = router;