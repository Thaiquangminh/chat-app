import express from 'express'
import dotenv from "dotenv"
import authRoutes from './routes/auth.routes.js'
import connectToMongoDb from './db/connectToMongoDb.js'

const app = express()
const port = process.env.PORT || 5000

// Enviroments
dotenv.config()

app.use(express.json()) // parse incoming requests

// Routes
app.use('/api/auth', authRoutes)

app.listen(port, () => {
  connectToMongoDb()
  console.log(`Example app listening on port ${port}`)
})