const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const Product = require("../../../models/product");

router.route('/products')
    .get((req, res) => {
        Product.find((err, data) => {
            if (err) res.send(err)
            console.log('data:', data)
            res.json(data)
        })
    })


module.exports = router;
