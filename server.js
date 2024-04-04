import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

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
    res.send('Hello World')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
