const express = require('express')
const {createOrder,updateOrder,getOrder,deleteOrder} = require("../controllers/order");
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/order',auth,createOrder)

router.patch("/order/:id",auth,updateOrder)

router.get("/order",auth,getOrder)

router.delete("/order/:id",auth,deleteOrder)


module.exports = router