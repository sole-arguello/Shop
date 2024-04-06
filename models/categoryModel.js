import mongoose from 'mongoose'

const categoryCollection = 'categories'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
},
{
    timestamps: true
})

export const Category = mongoose.model(categoryCollection, categorySchema)