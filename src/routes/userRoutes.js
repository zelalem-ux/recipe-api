const express = require('express')
const UserController = require('../controllers/userController')
const { authGuard } = require('../middleware/authMiddleware')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()
const userController = new UserController()

router.post('/', userController.createUser.bind(userController))
router.get('/:id', userController.getUserById.bind(userController))
router.get('/', authGuard, userController.getAllUsers.bind(userController))
router.put(
  '/:id',
  authGuard,
  userController.updateUserById.bind(userController)
)
router.delete(
  '/:id',
  authGuard,
  userController.deleteUserById.bind(userController)
)

router.post(
  '/upload/csv',
  upload.single('csvFile'),
  userController.uploadCSVFile.bind(userController)
)

module.exports = router
