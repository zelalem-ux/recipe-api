const { uid } = require('uid')
const RecipeService = require('../services/recipeService')
const fs = require('fs').promises
const path = require('path')

class RecipeController {
  constructor() {
    this.recipeService = new RecipeService()
  }

  async create(req, res) {
    const picture = req.file
    const fileExtension = path.extname(file.originalname)
    const autoGenName = uid(16) + '.' + fileExtension
    const recipe = await this.recipeService.create({
      user: req.userId,
      image: autoGenName,
      ...req.body,
    })

    const stream = fs.createWriteStream(`uploads/recipes/${autoGenName}`)
    stream.write(picture.buffer)
    await stream.end()

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
