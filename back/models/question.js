const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const questionSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    writer: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    comments: [
        {
            author: String,
            content: String,
            comment_date: { type: Date, default: Date.now }
        }
    ]
})


const Question = mongoose.model('Question', questionSchema)
//test data 생성
// for (let i = 0; i < 52; i++) {
//     const title = 'Question' + i;
//     const content =
//         `
//     문의드립니다.
//     알비노 팩맨 구매 의사가 있으나 ,
//     독이 있는지 물리면 어떤지 이빨은 얼마나 날카로운지 궁금합니다.
//     이 사이트에서 ${i}번째 구매 중인데 빠른 답변 부탁드립니다.
//     `;
//     const writer = 'testid'
//     Question.findOne({ title })
//         .then(r => {
//             if (!r) return Question.create({ title, content, writer })
//             return Promise.resolve(r)
//         }).then(r => {
//             console.log(r, '이 생성되었습니다')
//         }).catch(e => {
//             console.error(e)
//         })
// }


module.exports = Question