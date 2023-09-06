const mongoose = require('mongoose')

async function connect() {
  try {
    const { DB_HOST, DB_PORT, DB_NAME } = process.env
    await mongoose.connect(
      'mongodb://' + DB_HOST + ':' + DB_PORT + '/' + DB_NAME,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  } catch (error) {
    console.error(error)
  }
}

module.exports = connect
