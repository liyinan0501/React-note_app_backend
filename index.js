const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Note = require('./models/note')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

let notes = [
  {
    id: 1,
    content: 'HTML on helppoa',
    date: '2017-12-10T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Selain pystyy suorittamaan vain javascriptiä',
    date: '2017-12-10T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    date: '2017-12-10T19:20:14.298Z',
    important: true,
  },
  {
    id: 4,
    content: 'Testing',
    date: '2017-12-10T19:20:14.298Z',
    important: true,
  },
]

const generateId = () => {
  const maxId =
    notes.length > 0
      ? notes
          .map((n) => n.id)
          .sort((a, b) => a - b)
          .reverse()[0]
      : 1
  return maxId + 1
}

const formatNote = (note) => {
  const formattedNote = { ...note._doc, id: note.id }
  delete formattedNote._id
  delete formattedNote.__v
  return formattedNote
}

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => res.json(notes.map(formatNote)))
})

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id).then((note) => res.json(formatNote(note)))
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then((savedNote) => res.json(formatNote(savedNote)))

  // const note = {
  //   id: generateId(),
  //   content: body.content,
  //   date: new Date(),
  //   important: body.important || false,
  // }

  // notes = notes.concat(note)
  // res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id).then((result) => res.status(204).end())

  // notes = notes.filter((note) => note.id !== id)
  // res.status(204).end()
})

app.put('/api/notes/:id', (req, res) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important,
  }
  Note.findByIdAndUpdate(req.params.id, note, { new: true }).then(
    (updatedNote) => res.json(formatNote(updatedNote))
  )
  // const updatednote = req.body
  // notes.splice(
  //   notes.findIndex((item) => item.id === updatednote.id),
  //   1,
  //   updatednote
  // )
  // res.json(updatednote)
})

const error = (req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' })
  next()
}
app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
