var express = require("express");
var router = express.Router();
const AboutUs = require("../../../models/aboutUs");

router.route('/aboutUs')
    .get((req, res) => {
        AboutUs.find((err, data) => {
            if (err) res.send(err)
            console.log('data:', data)
            res.json(data)
        })
    })

module.exports = router;