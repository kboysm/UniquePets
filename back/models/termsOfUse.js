const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const termsOfUse = mongoose.Schema({
    title: { type: String, default: '이용약관' },
    content: { type: String, default: '' },
})

const TermsOfUse = mongoose.model('TermsOfUse', termsOfUse);
// const title = '(주)LSM의 이용약관';
// const content =
//     `
//     제1조(목적)
// 이 약관은 곤충농장 회사(전자상거래 사업자)가 운영하는 곤충농장사이버 몰(이하 “곤충농장”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 

// 이용자의 권리?의무 및 책임사항을 규정함을 목적으로 합니다.

// ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다」

// 제2조(정의)


// ①“곤충농장” 이란 곤충농장회사가 재화 또는 용역(이하 “재화등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여 재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 

// 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.

// ②“이용자”란 “곤충농장”에 접속하여 이 약관에 따라 “곤충농장”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.

// ③ ‘회원’이라 함은 “곤충농장”에 개인정보를 제공하여 회원등록을 한 자로서, “곤충농장”의 정보를 지속적으로 제공받으며, “몰”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.

// ④ ‘비회원’이라 함은 회원에 가입하지 않고 “곤충농장”이 제공하는 서비스를 이용하는 자를 말합니다.
// `;
// TermsOfUse.findOne({ title }).then(r => {
//     if (!r) return TermsOfUse.create({ title, content })
//     return Promise.resolve(r)
// }).then(r => {
//     console.log(`${r}이 생성되었습니다.`);
// }).catch(e => {
//     console.error(e)
// })

module.exports = TermsOfUse;