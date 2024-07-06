const mongoose = require('mongoose')

// Define the Schema for the Recipe model
const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    image: { type: String },
    duration: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  },
  {
    timestamps: true,
  }
)

const RecipeModel = mongoose.model('Recipe', recipeSchema)

module.exports = RecipeModel
