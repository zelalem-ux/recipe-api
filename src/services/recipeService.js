const AppService = require('./AppService')
const RecipeModel = require('../models/recipeModel')

class RecipeService extends AppService {
  constructor() {
    super(RecipeModel)
  }
}

module.exports = RecipeService
