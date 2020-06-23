const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const noticeSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    writer: { type: String, default: 'admin' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    comments: [
        {
            author: String,
            content: String,
            comment_date: { type: Date, default: Date.now }
        }
    ]
})


const Notice = mongoose.model('Notice', noticeSchema)
//test data 생성
// for (let i = 0; i < 42; i++) {
//     const title = 'notice' + i;
//     const content =
//         `
//     공지사항 테스트 입니다.
//     금일 ${i}시에 사이트 정검 예정입니다.
//     점검 시간동안 사이트 접속이 불가합니다.
//     감사합니다.
//     `;
//     console.log(content);
//     Notice.findOne({ title })
//         .then(r => {
//             if (!r) return Notice.create({ title, content })
//             return Promise.resolve(r)
//         }).then(r => {
//             console.log(r, '이 생성되었습니다')
//         }).catch(e => {
//             console.error(e)
//         })
// }


module.exports = Notice