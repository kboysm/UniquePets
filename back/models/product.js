const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const productSchema = new mongoose.Schema({
    productName: { type: String, default: '' },
    productDescription: { type: String, default: '' },
    productCategory: { type: String, default: '' },
    productImage: { type: String, default: '' },
    productSeller: { type: String, default: 'admin' },
    isBestProduct: { type: Boolean, default: false },
})

const Product = mongoose.model('Product', productSchema);


//test data 생성
const kinds = ['알비노_', '그린_', '브라운_', '판타스틱', '민트']
const productDescriptionAdd = ['가장 인기', '노멀', '인기&노멀', '신상품', '신상품'];
for (let i = 0; i < 5; i++) {
    const productName = kinds[i].concat('팩맨');
    const productDescription =
        `
    특이한 외모로 애완동물으로 인기가 많다.손가락을 갖다대면 앙하고 문다. 그런데 이빨이 없어서 안아프고 오히려 기분이 좋다.
    ${productDescriptionAdd[i]}
    `
    const productCategory = 'frog'
    const productImage = 'http://localhost:3000/images/' + i + '.jpg'
    Product.findOne({ productName })
        .then(r => {
            if (!r) return Product.create({ productName, productDescription, productCategory, productImage })
            return Promise.resolve(r)
        }).then(r => {
            console.log(r, '이 생성되었습니다')
        }).catch(e => {
            console.error(e)
        })
}

module.exports = Product