const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cfg = require("../../../../config/config");
const User = require("../../../models/users");
const Product = require("../../../models/product");
const crypto = require("crypto");
const { serialize } = require('v8');
// const fs = require('fs')
const signToken = (_id, id, lv, name, rmb) => {
  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresIn, // 3분
      algorithm: cfg.jwt.algorithm,
    };
    if (rmb) o.expiresIn = cfg.jwt.expiresInRemember; // 6일
    jwt.sign({ _id, id, lv, name, rmb }, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

router.post("/in", (req, res, next) => {
  const { id, pwd, remember } = req.body;
  if (!id) throw createError(400, "아이디가 없습니다");
  if (!pwd) throw createError(400, "비밀번호가 없습니다");
  if (remember === undefined) throw createError(400, "기억하기가 없습니다.");

  let u = {};
  User.findOne({ id })
    .lean() //몽구스 반환 객체를 자바스크립트로 만들어줌
    .then((r) => {
      console.log(r)
      if (!r) throw new Error("존재하지 않는 아이디입니다.");
      const p = crypto
        .scryptSync(pwd, r._id.toString(), 64, { N: 1024 })
        .toString("hex");
      if (r.pwd !== p) throw new Error("비밀번호가 틀립니다.");
      delete r.pwd;
      u = r;
      return signToken(r._id, r.id, r.lv, r.name, remember);
    })
    .then((r) => {
      res.send({ success: true, token: r, user: u });
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message });
      // next(createError(401, e.massage))
    });
});

router.post("/out", (req, res) => {
  res.send({ success: false, msg: "아직 준비 안됨." });
});

router.all("*", function (req, res, next) {
  next(createError(404, "그런 api 없어"));
});

module.exports = router;
