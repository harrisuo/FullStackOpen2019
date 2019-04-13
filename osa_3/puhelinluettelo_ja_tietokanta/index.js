
require('dotenv').config()

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



/* let persons = [
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
 */


//Mongo
/* const mongoose = require('mongoose')
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2] */

/* const mongoose = require('mongoose')
const url = `mongodb+srv://harrisuonikko:salasana@fullstackopen-ntznl.mongodb.net/fullstackopen?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema) */
/* const person = new Person({
    name: "",
    number: "",
}) */
/* 
console.log(person)

if (process.argv.length === 2) {
    app.get('/api/persons', (request, response) => {
        Person.find({}).then(p => {
            response.json(notes.map(p => p.toJSON()))
        })
    })
    console.log("meneekö tänne 1")
    mongoose.connection.close()

} else {
    process.argv.forEach((value, index) => {
        //console.log(value, index)
        if (index === 2) {
            person.name = value
        }
        if (index === 3) {
            person.number = value
        }
    })

    person.save().then(response => {
        console.log(`Lisätään ${person.name} numero ${person.number}`);
        mongoose.connection.close();
    })
} */


const generateId = () => id = Math.floor(Math.random() * 10000)

// Vaaditut tiedot: name, number
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const person = Person({
        name: body.name,
        number: body.number,
        //id: generateId(),
    })

    person.save().then(p => {
        console.log("meneekö töhän", p)
        res.json(p.toJSON())
    })

    console.log(`Lisätään ${person.name} numero ${person.number}`);

    //console.log("backend", addedPerson)
    //newPersons = persons.concat(addedPerson)
    //res.json(newPersons)
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
    /*     const id = Number(req.params.id)
        const person = persons.find(p => p.id === id)
    
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        } */

    Person.findById(req.params.id).then(p => {
        res.json(p.toJSON())
    })
})

app.delete('/api/persons/:id', (req, res) => {
    /*     const id = Number(req.params.id);
        const newPersons = persons.filter(p => p.id !== id);
    
        if (!persons.find(p => p.id === id)) {
            res.status(404).end();
        } else {
            res.json(newPersons)
            res.status(204).end();
        } */

    Person.findById(req.params.id).then(p => {
        console.log(p)
        res.json(p.toJSON())
    })

});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


