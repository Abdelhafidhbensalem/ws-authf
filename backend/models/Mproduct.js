const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    qte: Number,
    image: String,
    createDate: { type: Date, default: Date.now() },
    isActive: { type: Boolean, default: true }

})
module.exports = Product = mongoose.model("product", productSchema)