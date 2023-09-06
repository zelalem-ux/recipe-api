const express = require('express')

require('dotenv').config()
const cors = require('cors')

const db_connect = require('./db/database')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()
app.use(cors())

db_connect().then(() => {
  console.log('Connected to MongoDB')
})

app.use(express.json())
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
