// const { uid } = require('uid')
// const RecipeService = require('../services/recipeService')
// const fs = require('fs').promises
// const path = require('path')

// class RecipeController {
//   constructor() {
//     this.recipeService = new RecipeService()
//   }

//   async create(req, res) {
//     const picture = req.file
//     const fileExtension = path.extname(file.originalname)
//     const autoGenName = uid(16) + '.' + fileExtension
//     const recipe = await this.recipeService.create({
//       user: req.userId,
//       image: autoGenName,
//       ...req.body,
//     })

//     const stream = fs.createWriteStream(`uploads/recipes/${autoGenName}`)
//     stream.write(picture.buffer)
//     await stream.end()

//     res.status(201).json(recipe)
//   }

//   async getById(req, res) {
//     const recipe = await this.recipeService.findById(req.params.id)
//     res.json(recipe)
//   }

//   async getAll(req, res) {
//     const recipes = await this.recipeService.findAll()
//     res.json(recipes)
//   }

//   async updateById(req, res) {
//     const recipe = await this.recipeService.updateById(req.params.id, req.body)
//     res.json(recipe)
//   }

//   async deleteById(req, res) {
//     const recipe = await this.recipeService.deleteById(req.params.id)
//     res.json(recipe)
//   }
// }

// module.exports = RecipeController
const { uid } = require('uid');
const RecipeService = require('../services/recipeService');
const fs = require('fs').promises;
const path = require('path');

class RecipeController {
  constructor() {
    this.recipeService = new RecipeService();
  }

  async create(req, res) {
    try {
      const picture = req.file; // 'picture' is the field name used in multer

      if (!picture || !picture.buffer) {
        return res.status(400).json({ error: 'File buffer is missing' });
      }

      const fileExtension = path.extname(picture.originalname);
      const autoGenName = uid(16) + fileExtension; // Remove extra '.' from file extension

      // Check if req.userId is properly set
      if (!req.userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Create the recipe
      const recipe = await this.recipeService.create({
        user: req.userId,
        image: autoGenName,
        ...req.body,
      });

      // Save the file to the server
      const filePath = path.join(__dirname, '..', 'uploads', 'recipes', autoGenName);
      await fs.writeFile(filePath, picture.buffer);

      res.status(201).json(recipe);
    } catch (error) {
      console.error('Error creating recipe:', error);
      res.status(500).json({ error: 'Failed to create recipe' });
    }
  }

  async getById(req, res) {
    try {
      const recipe = await this.recipeService.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      res.status(500).json({ error: 'Failed to fetch recipe' });
    }
  }

  async getAll(req, res) {
    try {
      const recipes = await this.recipeService.findAll();
      res.json(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  }

  async updateById(req, res) {
    try {
      const recipe = await this.recipeService.updateById(req.params.id, req.body);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ error: 'Failed to update recipe' });
    }
  }

  async deleteById(req, res) {
    try {
      const recipe = await this.recipeService.deleteById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Failed to delete recipe' });
    }
  }
}

module.exports = RecipeController;
