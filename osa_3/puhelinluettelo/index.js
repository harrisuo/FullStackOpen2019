const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(morgan('tiny'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    },
]

const generateId = () => id = Math.floor(Math.random() * 10000)

// Required content: name, number
app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)
    if (!body.name) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const addedPerson = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    newPersons = persons.concat(addedPerson)
    res.json(newPersons)
})


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// Miten rivinvaihto tässä?
app.get('/info', (req, res) => {
    const time = new Date()
    const str = `Puhelinluettelossa on ${persons.length} henkilön tiedot \n ${time}`
    res.send(str)
})


app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const newPersons = persons.filter(p => p.id !== id);

    if (!persons.find(p => p.id === id)) {
        res.status(404).end();
    } else {
        res.json(newPersons)
        res.status(204).end();
    }
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})