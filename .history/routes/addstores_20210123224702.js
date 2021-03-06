const express = require('express');
const router = express.Router();
const Store = require("../models/Store");
const sanitizer = require('express-sanitizer')

router.get('/', (req, res) => {
    res.render("index")
})

router.get('/store', (req,res) => {
    Store.find({}, (err,campgrounds) => {
        if (!err) {
            res.render('index')
        } else console.log(err)
    })
})

router.post('/store', isLoggedIn, (req,res) => {
    let name = req.body.name
    let image = req.body.image
    let description = req.body.description
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCamp = {name : name, image : image, description : description, author : author}
    Store.create(newCamp, (err,camp) => {
        if(!err){
            console.log("new store added",camp)
            res.redirect('/store')
        }  else console.log(err)
    })
})

module.exports = router