const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitLab!
const url =
  'mongodb+srv://yinanli:46003700Yinan@cluster0.gpqhj.mongodb.net/fullstack-notes'

mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean,
})

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})

// const note = new Note({
//   content: 'HTML on helppoa',
//   date: new Date(),
//   important: true,
// })

// note.save().then((response) => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })
