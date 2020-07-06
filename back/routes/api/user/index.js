const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const User = require("../../../models/users");
const Product = require("../../../models/product");
const crypto = require("crypto");
const cfg = require("../../../../config/config")
const axios = require('axios')
const multer = require('multer');
let upload = multer({ dest: 'public/userImg/' })
let fs = require('fs');
let filePath = 'C:/Users/lisha/Desktop/shop/UniquePets/back/public/userImg/';

router.post('/userImage', upload.single('upLoadImage'), (req, res) => {

    User.findById({ _id: req.body._id }).then(user => {
        if (!user) return res.json({ success: false, msg: '존재하지 않는 유저입니다.' })
        if (user.img) {
            fs.unlinkSync(filePath.concat(user.img))
        }
        user.img = req.file.filename;
        user.save()
        return user;
    }).then(u => {

        res.json({ success: true, msg: '이미지 저장', user: u })
    })
})

router.get('/:_id', (req, res) => {
    const { _id } = req.params;

    User.findById({ _id }).exec((err, docs) => {
        if (err) return res.send(err);
        res.json(docs);
    })

})
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
    const { cart, u_id, totalPrice } = req.body;

    User.findById({ _id: u_id }).then(r => {
        r.cart = [];
        r.orderList.push({ list: cart, date: new Date() })
        r.point -= totalPrice;
        r.save();
        res.json({ sucess: true, msg: '구매 완료', user: r });
    })
})

router.post('/update/address', (req, res, next) => {
    const { address, center, _id } = req.body;
    User.findById({ _id }).then(r => {
        r.address = address
        r.center = center
        r.save();
        res.json({ sucess: true, msg: '주소 변경 완료', user: r });
    })
})

router.post('/update/password', (req, res, next) => {
    const { password, _id } = req.body;
    const pwd = crypto
        .scryptSync(password, _id.toString(), 64, { N: 1024 })
        .toString("hex");
    User.findById({ _id }).then(r => {
        r.pwd = pwd;
        r.save();
        res.json({ sucess: true, msg: '비밀번호 변경 완료', user: r });
    })
})
router.post('/update/payment', (req, res, next) => {
    const point = req.body.point

    const url = "https://kapi.kakao.com";
    const headers = {
        'Authorization': "KakaoAK " + cfg.kakaoPay,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    }

    const params = [
        'cid=TC0ONETIME',
        'partner_order_id=1111',
        'partner_user_id=1111',
        `item_name=포인트`,
        `quantity=1`,
        `total_amount=${point}`,
        `vat_amount=0`,
        `tax_free_amount=0`,
        `approval_url=http://localhost:8080/approval`,
        `fail_url=http://localhost:8080/fail`,
        `cancel_url=http://localhost:8080/cancel`
    ].join('&');
    axios.post(url + "/v1/payment/ready", params, { headers }).then(r => {
        console.log(r)
        res.json(r.data)
    }).catch(e => {
        console.log(e)
        res.json(e)
    })

})
router.post('/payment/approval', (req, res) => {
    let point = 0;
    const { tid, _id, pg_token } = req.body;
    const url = "https://kapi.kakao.com";
    const headers = {
        'Authorization': "KakaoAK " + cfg.kakaoPay,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    }
    const params = [
        'cid=TC0ONETIME',
        `tid=${tid}`,
        'partner_order_id=1111',
        'partner_user_id=1111',
        `pg_token=${pg_token}`
    ].join('&');
    axios.post(url + "/v1/payment/approve", params, { headers }).then(res => {

        return res.data.amount.total;
    }).then(total => {
        return User.findById({ _id }).then(r => {
            r.point += total;
            point = r.point
            r.save();
            return r;
        }).catch(err => {
            console.log(err)
        })
    }).then(result => {
        res.send({ success: true, msg: '결제 완료', user: result });
    })
        .catch(e => {
            console.log(e)

        })

})

module.exports = router;
