const express = require('express')
const RecipeController = require('../controllers/recipeController')
const { authGuard } = require('../middleware/authMiddleware')

// const multer = require('multer')
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

const router = express.Router()
const recipeController = new RecipeController()

router.post('/', authGuard, recipeController.create.bind(recipeController))
router.get('/:id', recipeController.getById.bind(recipeController))
router.get('/', recipeController.getAll.bind(recipeController))
router.put(
  '/:id',
  authGuard,
  recipeController.updateById.bind(recipeController)
)
router.delete(
  '/:id',
  authGuard,
  recipeController.deleteById.bind(recipeController)
)

module.exports = router
