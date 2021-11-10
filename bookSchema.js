const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    read: Boolean
})

module.exports = mongoose.model('Book', bookSchema)