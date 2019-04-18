if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())


// Vaaditut tiedot: name, number
app.post('/api/persons', (req, res, next) => {
    const body = req.body
    const person = Person({
        name: body.name,
        number: body.number,
        //id: Math.floor(Math.random() * 10000),
    })

    person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            console.log("meneekö tähän")
            res.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))
})


app.get('/api/persons', (req, res) => {
    Person.find({}).then(p => {
        res.json(p.map(person => person.toJSON()))
    })
})

// Miten rivinvaihto tässä?
app.get('/api/info', (req, res) => {
    const time = new Date()
    const str = `Puhelinluettelossa on ${persons.length} henkilön tiedot \n ${time}`
    res.send(str)
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(p => {
        if (p) {
            res.json(person.toJSON())
        } else {
            res.status(202).end()
        }
    })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then(result => {
        res.status(204).end()
    })
        .catch(error => next(error))
});


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

// virheellisten pyyntöjen käsittely
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


