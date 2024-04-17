import mongoose from 'mongoose'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: Object,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false 
    },
    sold: {
        type: Number,
        default: 0
    },

},
{
    timestamps: true
})

export const Products = mongoose.model(productCollection, productSchema)