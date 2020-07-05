var express = require("express");
var router = express.Router();
const Question = require("../../../models/question");

router.get('/', (req, res) => {
    const noticeList = [];

    Question.find({}).sort({ createdAt: -1 }).exec()
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
    const { _id } = req.params;

    Question.findById({ _id }).exec((err, docs) => {
        if (err) return res.send(err);
        res.json(docs);
    })

    // Notice.findById({ _id }).exec((err, docs) => {
    //     if (err) return res.send(err);
    //     docs.views++;
    //     docs.save();
    //     res.send(docs);
    // })
})

router.post('/createQuestion', (req, res) => {
    const { title, content, writer } = req.body;
    if (!title) res.json({ success: false, msg: 'title이 없습니다' })
    if (!content) res.json({ success: false, msg: 'content가 없습니다' })
    if (!writer) res.json({ success: false, msg: '비로그인' })

    Question.create({ title, content, writer }).then(r => {
        res.json(r)
    }).catch(e => {
        res.json(e)
    })

})
router.post('/update', (req, res) => {

    Question.findById({ _id: req.body._id }).exec((err, docs) => {
        if (err) return res.send(err);
        docs.title = req.body.title;
        docs.updateAt = req.body.updateAt;
        docs.content = req.body.content;
        docs.save()
        res.json(docs)
    })
})

router.post('/delete', (req, res) => {
    const { _id } = req.body;
    console.log(_id);
    Question.deleteOne({ _id: req.body._id }).then(r => {
        res.json(r);
    })
})

router.post('/comment/writer', (req, res) => {
    const _id = req.body._id;
    const comment = req.body.comment;
    const author = req.body.author;
    console.log(_id, comment, author);
    Question.findById({ _id }).exec((err, docs) => {
        if (err) return res.send(err);
        docs.comments.push({ author, content: comment })
        docs.save()
        res.send(docs.comments)
    })
})
module.exports = router;