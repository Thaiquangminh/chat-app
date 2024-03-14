import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMongoDb from './db/connectToMongoDb.js'

const app = express()
const port = process.env.PORT || 5000

// Enviroments
dotenv.config()

app.use(express.json()) // parse incoming requests
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/user', userRoutes)


app.listen(port, () => {
  connectToMongoDb()
  console.log(`Example app listening on port ${port}`)
})