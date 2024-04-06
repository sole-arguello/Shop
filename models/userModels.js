import mongoose from 'mongoose'

const usercollection = 'users'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: Number,
        default: 0
    },
    cart:{
        type: Array,
        default: []
    }
},
{
    timestamps: true
})
export const User = mongoose.model(usercollection, userSchema)
