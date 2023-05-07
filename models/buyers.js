const mongoose = require('mongoose');

const BuyerSchema= new mongoose.Schema({
    name: { type:String, required: true },
    email: { type:String, required: true },
    phone_no: { type:String, required: true , unique: true},
    photo: { type:String },
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    address: { type:Object, required: true },
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetail' }],
    shops : [{type: mongoose.Schema.Types.ObjectId, ref: 'Fpo' }],
    notifications: [{type:String , required: true}],
}, {
    timestamps: true
});



const Buyers= mongoose.model('Buyer', BuyerSchema);
module.exports = Buyers;