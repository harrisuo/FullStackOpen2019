import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import ViewPersons from './components/ViewPersons'
import AddPersonForm from './components/AddPersonForm'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    //Estää saman nimen lisäämisen toiseen kertaan
    if (persons.map(person => person.name).includes(newName)) {
      setMessage(`${newName} on jo luettelossa`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return null
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService.create(newPerson).then(returnedPersons => {
      setPersons(persons.concat(returnedPersons))
      setMessage(`Lisättiin ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
      
    }).catch(error => {
      setMessage('Tapahtui virhe')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }


  const handleRemove = (id) => {
    const rightPerson = persons.find(n => n.id === id)
    personService.remove(rightPerson.id).then(returnedPerson => {
      setPersons(persons.filter(n => n.id !== rightPerson.id))
    
    }).catch(error => {
      setMessage(`${rightPerson.name} ei löydy luettelosta`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })

    setMessage(`Poistettiin ${rightPerson.name}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    setPersons(persons.filter(n => n.name !== rightPerson.name))
  }

  return (
    <div>

      <Notification input={message} />

      <h1>Puhelinluettelo</h1>
      <FilterForm
        filter={filter}
        handleFilter={handleFilter}
      />

      <h2>Lisää uusi</h2>
      <AddPersonForm
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numerot</h2>
      <ViewPersons
        persons={persons}
        filter={filter}
        handleRemove={handleRemove}
      />
    </div >
  )

}

export default App