const mongoose = require('mongoose');

const productDetailsSchema = new mongoose.Schema({
    category :{ type:String, required: true ,enum: ['Fruits', 'Vegetables', 'Pulses', "Grains"]},
    product :{ type:String, required: true },
    quantity_added: { type:String, required: true },
    fpo_id: { type: mongoose.Schema.Types.ObjectId, ref: "Fpo",required: true },
    original_price:{ type:String, required: true } ,
    multiple_photo_link: [{ type:String }],
    selling_price: { type:String, required: true },
    current_quantity: { type:String, required: true },
}, {
    timestamps: true
});



const ProductDetails = mongoose.model('ProductDetail', productDetailsSchema);
module.exports = ProductDetails;