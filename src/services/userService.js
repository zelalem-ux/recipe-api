const AppService = require('./AppService')
const UserModel = require('../models/userModel')

class UserService extends AppService {
  constructor() {
    super(UserModel)
  }
}

module.exports = UserService
