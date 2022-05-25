const mongoose = require('mongoose')

const url =
  'mongodb+srv://yinanli:46003700Yinan@cluster0.gpqhj.mongodb.net/fullstack-notes'

mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean,
})

module.exports = Note
