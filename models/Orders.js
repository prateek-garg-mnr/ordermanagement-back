const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    dueDate:Date,
    buyerName:String,
    buyerPhone:{
        type:Number,
    },
    address:{
        country:String,
        city:String,
        state:String,
        zipCode:Number
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'users'
    },
    amount:Number

},{
    timestamps: true
})


const Orders = mongoose.model('orders',orderSchema)


module.exports = Orders