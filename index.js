const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

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

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = {
    id: generateId(),
    content: body.content,
    date: new Date(),
    important: body.important || false,
  }

  notes = notes.concat(note)
  res.json(note)
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = +req.params.id
  const note = notes.find((note) => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = +req.params.id
  notes = notes.filter((note) => note.id !== id)
  res.status(204).end()
})

//ask
app.put('/api/notes/:id', (req, res) => {
  const updatednote = req.body
  notes.splice(
    notes.findIndex((item) => item.id === updatednote.id),
    1,
    updatednote
  )
  res.json(updatednote)

  // const id = +req.params.id
  // notes = notes.map((note) =>
  //   note.id === id ? { ...note, important: !note.important } : note
  // )
  // const updatednote = notes.find((note) => note.id === id)
  // res.json(updatednote)
})

const error = (req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' })
  next()
}
app.use(error)
app.use(express.static('build'))
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
