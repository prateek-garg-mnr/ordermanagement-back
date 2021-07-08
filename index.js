//express and database
const express = require('express')
const cors = require("cors")
require("dotenv").config()
require('./db/mongoose')
//express included
const app =express()
//cors
app.use(cors())
//port number 
const port = process.env.PORT
app.use(express.json()) // parse the incomming json data to an object
//routers
const userRouter = require('./routers/user')
const orderRouter = require('./routers/order')

app.use(userRouter)
app.use(orderRouter)


app.listen(port,()=>{
    console.log('server is up at '+port)
})