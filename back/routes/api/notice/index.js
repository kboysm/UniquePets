var express = require("express");
var router = express.Router();
const Notice = require("../../../models/notice");
router.get('/', (req, res) => {
    const noticeList = [];

    Notice.find({}).sort({ createdAt: -1 }).exec()
        .then(r => {
            res.send(r)
        })
        .catch(e => {
            console.error(e);
        })
    // console.log(noticeList)
    // console.log(noticeList)
    // res.send(noticeList)
})
router.get('/:_id', (req, res) => {
    const { _id } = req.params

    Notice.findById({ _id }).exec((err, docs) => {
        if (err) return res.send(err);
        docs.views++;
        docs.save();
        res.send(docs);
    })

})
router.post('/comment/writer', (req, res) => {
    const _id = req.body._id;
    const comment = req.body.comment;
    const author = req.body.author;
    console.log(_id, comment, author);
    Notice.findById({ _id }).exec((err, docs) => {
        if (err) return res.send(err);
        console.log(docs)
        docs.comments.push({ author, content: comment })
        docs.save()
        res.send(docs.comments)
    })
})
module.exports = router;