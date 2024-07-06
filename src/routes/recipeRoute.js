// const express = require('express')
// const RecipeController = require('../controllers/recipeController')
// const { authGuard } = require('../middleware/authMiddleware')

// const multer = require('multer')
// const upload = multer()

// const router = express.Router()
// const recipeController = new RecipeController()

// router.post(
//   '/',
//   upload.single('picture'),
//   authGuard,
//   recipeController.create.bind(recipeController)
// )
// router.get('/:id', recipeController.getById.bind(recipeController))
// router.get('/', recipeController.getAll.bind(recipeController))
// router.put(
//   '/:id',
//   authGuard,
//   recipeController.updateById.bind(recipeController)
// )
// router.delete(
//   '/:id',
//   authGuard,
//   recipeController.deleteById.bind(recipeController)
// )

// module.exports = router
const express = require('express');
const RecipeController = require('../controllers/recipeController');
const { authGuard } = require('../middleware/authMiddleware');

const multer = require('multer');
const upload = multer(); // Initialize multer without storage for simplicity

const router = express.Router();
const recipeController = new RecipeController();

router.post(
  '/',
  upload.single('image'), // Ensure the field name matches 'image'
  authGuard, // Make sure this line is correct
  recipeController.create.bind(recipeController)
);
router.get('/:id', recipeController.getById.bind(recipeController));
router.get('/', recipeController.getAll.bind(recipeController));
router.put(
  '/:id',
  // authGuard, // Ensure this line is correct if you use authGuard
  recipeController.updateById.bind(recipeController)
);
router.delete(
  '/:id',
  // authGuard, // Ensure this line is correct if you use authGuard?
  recipeController.deleteById.bind(recipeController)
);

module.exports = router;
