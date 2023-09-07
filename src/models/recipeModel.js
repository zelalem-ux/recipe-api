const mongoose = require('mongoose')

// Define the Schema for the Recipe model
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
})

const RecipeModel = mongoose.model('Recipe', recipeSchema)

module.exports = RecipeModel
