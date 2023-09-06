const bcrypt = require('bcrypt')
const UserService = require('../services/userService')
const csvParser = require('csv-parser')

class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async createUser(req, res) {
    const { password, ...rest } = req.body

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Store the user in the database with the hashed password
    const user = await this.userService.create({
      password: hashedPassword,
      ...rest,
    })
    res.status(201).json(user)
  }

  async getUserById(req, res) {
    const user = await this.userService.findById(req.params.id)
    res.json(user)
  }

  async getAllUsers(req, res) {
    const users = await this.userService.findAll()
    res.json(users)
  }

  async updateUserById(req, res) {
    const user = await this.userService.updateById(req.params.id, req.body)
    res.json(user)
  }

  async deleteUserById(req, res) {
    const user = await this.userService.deleteById(req.params.id)
    res.json(user)
  }

  async uploadCSVFile(req, res) {
    const { originalname, mimetype, size, buffer } = req.file

    const csvData = buffer.toString('utf8')
    const results = []
    // Use csv-parser to parse the CSV data and convert it to JSON
    csvParser({ headers: true })
      .on('data', (data) => {
        results.push(data)
      })
      .on('end', () => {
        // Send the JSON data back to the client
        res.json(results)
      })
      .write(csvData)

    res.json({
      message: 'uploaded',
      originalname,
      mimetype,
      size,
      headers: results[0],
      results: results.slice(1),
    })
  }
}

module.exports = UserController
