const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
require('express-async-errors')

// connectDB
const connectDB = require('./db/connect')

// middleware
const notFoundMiddleware = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')

app.get('/', (req, res) => res.send('Hello World!'))

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
