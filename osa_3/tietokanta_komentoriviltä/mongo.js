const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://harrisuonikko:${password}@fullstackopen-ntznl.mongodb.net/fullstackopen?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: "",
  number: "",
})

if (process.argv.length === 3) {
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(p => {
      response.json(p)
    })
  })
    mongoose.connection.close()

} else {
  process.argv.forEach((value, index) => {
    //console.log(value, index)
    if (index === 3) {
      person.name = value
    }
    if (index === 4) {
      person.number = value
    }
  })

  person.save().then(response => {
    console.log(`Lisätään ${person.name} numero ${person.number}`);
    mongoose.connection.close();
  })
}
