// const express = require('express')

// require('dotenv').config()
// const cors = require('cors')
// const PORT = 3001
// const db_connect = require('./db/database')
// const userRoutes = require('./routes/userRoutes')
// const authRoutes = require('./routes/authRoutes')
// const recipeRoutes = require('./routes/recipeRoute')

// const app = express()
// app.use(cors())

// db_connect().then(() => {
//   console.log('Connected to MongoDB')
// })

// app.use(express.json())
// //app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// app.use('/api/v1/users', userRoutes)
// app.use('/api/v1/auth', authRoutes)
// app.use('/api/v1/recipe', recipeRoutes)

// app.listen(PORT, () => {
//   console.log('Server is running on port 3001')
// })

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const db_connect = require('./db/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoute');

const app = express();
const PORT = 3001;

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());

db_connect().then(() => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/recipe', recipeRoutes);

// Route for creating a recipe with file upload
const RecipeController = require('./controllers/recipeController');
const recipeController = new RecipeController();

app.post('/api/v1/recipe', upload.single('image'), (req, res) => recipeController.create(req, res));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
