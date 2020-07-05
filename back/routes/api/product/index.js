const express = require("express");
const router = express.Router();
const Product = require("../../../models/product");

router.route('/products')
    .get((req, res) => {
        Product.find((err, data) => {
            if (err) res.send(err)

            res.json(data)
        })
    })


module.exports = router;
