import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { userRouter } from './routes/user.routes.js';
import { categoryRouter } from './routes/category.routes.js';
import { uploadRouter } from './routes/upload.routes.js';
import { productRouter } from './routes/product.routes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

//rutas
app.use('/user', userRouter)
app.use('/api', categoryRouter)
app.use('/api', uploadRouter)
app.use('/api', productRouter)

//conexion 
const URI = process.env.MONGO_URL
mongoose.connect(URI)
.then(() => {
    console.log('Database connected')
})
.catch(err => {
    console.error('Database connection error:', err)
    process.exit(1) // Salir del proceso con código de error
})

app.get('/', (req, res) => {
    res.json({msg: 'Hello World'})
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
