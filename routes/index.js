const express = require('express');
const router = express.Router();
const Url = require('../models/URL');


// GET VIEW 
router.get('/', (req, res, next) => {
    res.render('index');
});


// Redirect to long/original
router.get('/:code', async (req, res) => {
    try{
        const url = await Url.findOne({ urlCode: req.params.code });
        if(url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(4040).json({
                message: 'no url found'
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'server error'
        })
    }
})


module.exports = router