var express = require("express");
var router = express.Router();
const TermsOfUse = require("../../../models/termsOfUse");

router.route('/Terms')
    .get((req, res) => {
        TermsOfUse.find((err, data) => {
            if (err) res.send(err)
            console.log('data:', data)
            res.json(data)
        })
    })

module.exports = router;