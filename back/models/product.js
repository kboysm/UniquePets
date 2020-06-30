const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
// const testData = require('../productList')
// console.log(testData);
const productSchema = new mongoose.Schema({
    productName: { type: String, default: '' },
    productDescription: { type: String, default: '' },
    productCategory: { type: String, default: '' },
    productImage: { type: String, default: '' },
    productSeller: { type: String, default: 'admin' },
    isBestProduct: { type: Boolean, default: false },
    productPrice: { type: Number, default: 0 },
    Quantity: { type: Number, default: 1 }
})

const Product = mongoose.model('Product', productSchema);


//test data 생성

// for (let i = 0; i < testData.length; i++) {

//     Product.findOne({ productName: testData[i].productName })
//         .then(r => {
//             if (!r) return Product.create(testData[i])
//             return Promise.resolve(r)
//         }).then(r => {
//             console.log(r, '이 생성되었습니다')
//         }).catch(e => {
//             console.error(e)
//         })
// }

module.exports = Product