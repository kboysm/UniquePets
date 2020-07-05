const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const User = require("../../../models/users");
const Product = require("../../../models/product");

router.post('/cart', (req, res, next) => {

    const { p_id, u_id } = req.body;

    if (!p_id) return { success: false, msg: '상품오류' }
    if (!u_id) return { success: false, msg: '로그인 오류' }

    Product.findById({ _id: p_id }).then(product => {
        User.findById({ _id: u_id }).then(user => {
            if (!user) return res.json({ success: false, msg: '존재하지 않는 유저입니다.' })
            console.log(product)
            user.cart.push(product)
            user.save()
            res.json({ success: true, msg: '상품 추가', user })
        })
    })

        .catch(e => {
            console.error(e)
        })
})
router.post('/cart/delete', (req, res, next) => {
    const { cart, u_id } = req.body;

    User.findById({ _id: u_id }).then(r => {
        r.cart = cart;
        r.save();
        res.json({ sucess: true, msg: '삭제 완료', user: r });
    })
})

router.post('/cart/purchase', (req, res, next) => {
    if (!req.body) res.json({ sucess: false, msg: '상품이 존재하지 않습니다.' })
    const { cart, u_id } = req.body;

    User.findById({ _id: u_id }).then(r => {
        r.cart = [];
        r.orderList.push({ list: cart, date: new Date() })
        r.save();
        res.json({ sucess: true, msg: '구매 완료', user: r });
    })
})
router.post('/update/:_id', (req, res, next) => {
    console.log(req.body);
})

module.exports = router;
