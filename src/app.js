const express = require('express')

require('dotenv').config()
const cors = require('cors')

const db_connect = require('./db/database')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const recipeRoutes = require('./routes/recipeRoute')

const app = express()
app.use(cors())

db_connect().then(() => {
  console.log('Connected to MongoDB')
})

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/recipe', recipeRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
