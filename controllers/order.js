const Orders = require("../models/Orders");

const createOrder = async (req,res)=>{
    try{
        const {dueDate,city,zipcode,country,state,amount,buyerName,buyerPhone,} = req.body
        let address = {city,zipcode,country,state}
        const order = new Orders({
            address,dueDate,amount,buyerName,buyerPhone,
            owner:req.user.id
        })
        await order.save()
        return res.send({message:"Order successfully added"})
    }catch(e){
        console.log(e)
        return res.status(400).send({message:e.message})
    }
    
}

const updateOrder = async(req,res)=>{
    try{
        const {id} = req.params
        const {city,state,country} = req.body
        const order = await Orders.findOne({_id:id,owner:req.user.id})
        if(!order){
            return res.status(400).send({message:"No order found"})
        }
        const validupdates = ["dueDate","buyerPhone","buyerName","amount"]
        validupdates.forEach((val)=>{
            order[val]=req.body[val]
        })
        order.address = {city,state,country}
        await order.save()
        res.send({message:"order Successfully Updated"})
    } catch(e){
        console.log(e)
        return res.status(400).send({message:e.message})
    }
}

const getOrder = async(req,res)=>{
    try{
        const orders = await Orders.find({owner:req.user.id})
        return res.send(orders)
    } catch(e){
        console.log(e)
        return res.status(400).send({message:e.message})
    }
}

const deleteOrder = async(req,res)=>{
    try{
        const {id} = req.params
        const order = await Orders.deleteOne({owner:req.user.id,_id:id})
        
        return res.send({message:"deleted",order})

    } catch(e){
        console.log(e)
        return res.status(400).send(e.message)
    }
}

module.exports = {
    createOrder,getOrder,updateOrder,deleteOrder
}