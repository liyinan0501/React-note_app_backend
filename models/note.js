const mongoose = require('mongoose')

const url =
  'mongodb+srv://yinanli:yinanli123@cluster0.gpqhj.mongodb.net/fullstack-notes'

mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean,
})

module.exports = Note
