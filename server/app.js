const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
require('express-async-errors')

// packages
const cookieParser = require('cookie-parser')

// connectDB
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoute')

// middleware
const notFoundMiddleware = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

// routes
app.use('/api/v1/auth', authRouter)

// error handler
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`http://localhost:${port}/`))
  } catch (error) {
    console.log(error)
  }
}
start()
