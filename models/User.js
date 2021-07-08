const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        trim:true,
        required:true
    },
    email:{
        unique:true, // to prevent the duplicacy in email i.e., one email can't be used again to create user
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter a valid email')
            }
        }

    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('enter another password')
            }
        }

    },
},{
    timestamps: true
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject  
}


userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await Users.findOne({email})
    if(!user){
        throw new Error('Unable to Login')
    }
    const isMatch = await bcrypt.compareSync(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.AUTH_TOKEN_SECRETKEY)
    await user.save()
    return token
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

let Users
try {
    Users = mongoose.model('users')
} catch (error) {
    Users =  mongoose.model('users',userSchema)
}
module.exports = Users