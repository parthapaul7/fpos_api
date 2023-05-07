const mongoose = require('mongoose');

var FpoSchema = new mongoose.Schema({
    name: { type:String, required: true },
    number: { type:String, required: true, unique: true },
    product_items: [{ type:String, enum: ['Fruits', 'Vegetables', 'Pulses', 'Grains', ]}],
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetail'}],
    total_product_sold: { type:String, required: true },
    orders: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    upi_id:{ type:String },
    rating: { type:String },
    image: { type:String },
}, {
    timestamps: true
});



const Fpos= mongoose.model('Fpo', FpoSchema);
module.exports = Fpos;
