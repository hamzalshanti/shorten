const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');

const URL = require('../models/URL');

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = process.env.BASEURL;
    
    // Check base url
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json({
            message: 'Invalid Base URI'
        });
    }

    // Create Url code
    const urlCode = shortId.generate();

    // Check long url
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await URL.findOne({ longUrl });
            if(url) {
                res.json(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode
                url = new URL({
                    longUrl,
                    shortUrl,
                    urlCode,
                });
                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'server error'
            })
        }
    } else {
        res.status(401).json({
            message: 'Invalid long url'
        })
    }
});

module.exports = router