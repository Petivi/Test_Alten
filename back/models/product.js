const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: { type: Number, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    inventoryStatus: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: false },
    rating: { type: Number, required: false },
})


const Product = mongoose.model('product', ProductSchema);


module.exports = Product;