const RecipeService = require('../services/recipeService')

class RecipeController {
  constructor() {
    this.recipeService = new RecipeService()
  }

  async create(req, res) {
    const recipe = await this.recipeService.create({
      user: req.userId,
      ...req.body,
    })
    res.status(201).json(recipe)
  }

  async getById(req, res) {
    const recipe = await this.recipeService.findById(req.params.id)
    res.json(recipe)
  }

  async getAll(req, res) {
    const recipes = await this.recipeService.findAll()
    res.json(recipes)
  }

  async updateById(req, res) {
    const recipe = await this.recipeService.updateById(req.params.id, req.body)
    res.json(recipe)
  }

  async deleteById(req, res) {
    const recipe = await this.recipeService.deleteById(req.params.id)
    res.json(recipe)
  }
}

module.exports = RecipeController
