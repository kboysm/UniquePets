const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const aboutUs = mongoose.Schema({
    title: { type: String, default: 'About Us' },
    content: { type: String, default: 'IT' },
    companyImg: { type: String }
})

const AboutUs = mongoose.model('AboutUs', aboutUs);
// const title = '(주)LSM';
// const content =
//     `
// ㈜LSM는 플랫폼 컨설팅 및 구축 전문회사 입니다.

// ㈜LSM는 일류 비즈니스 플랫폼 컨설팅 및 구축 전문 회사를 목표로 다양한 플랫폼의 구축 경험과 노하우를 가진 사람들이 모여 설립한 기업으로 고객의 가치 실현과 더 나은 새로운 경험을 제공하기 위하여 항상 노력하는 전문가 그룹입니다.

// 고객과의 소통 & 고객만족을 최우선으로 생각하며 글로벌 일류 IT 전문 그룹으로의 성장과 IT 기반 산업의 올바른 방향으로의 발전에 기여하여 사회에 이바지하고자 합니다.
// `;
// const companyImg = `http://localhost:3000/images/companyMap.jpg`;
// AboutUs.findOne({ title }).then(r => {
//     if (!r) return AboutUs.create({ title, content, companyImg })
//     return Promise.resolve(r)
// }).then(r => {
//     console.log(`${r}이 생성되었습니다.`);
// }).catch(e => {
//     console.error(e)
// })

module.exports = AboutUs;