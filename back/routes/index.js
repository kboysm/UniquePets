var express = require("express");
var router = express.Router();
var createError = require("http-errors"); //상단에 추가
router.use("/api/register", require("./api/register"));
router.use("/api/notice", require("./api/notice"));
router.use("/api/sign", require("./api/sign"));
router.use("/api/product", require("./api/product"));
router.use("/api/about", require("./api/about"));
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
