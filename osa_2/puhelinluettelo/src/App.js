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

    
    const newPerson = {
      name: newName,
      number: newNumber,
    }
  
    //Estää saman nimen lisäämisen toiseen kertaan
    const nameList = persons.map(p => p.name)
    console.log("Lista:", nameList)
    if (nameList.includes(newPerson.name)) {
      setMessage(`${newPerson.name} on jo luettelossa`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return null
    }

    personService.create(newPerson).then(returnedPersons => {
      const addedPerson = returnedPersons.find(n => n.name === newName)
      console.log("frontti", returnedPersons, addedPerson)
      setPersons(persons.concat(addedPerson))
      setMessage(`Lisättiin ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
      
    }).catch(error => {
      setMessage(`${newName} on jo luettelossa`)
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
    personService.remove(id).then(returnedPersons => {
      console.log("poisto:", returnedPersons)
      setPersons(returnedPersons)
      setMessage(`Poistettiin ${rightPerson.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }).catch(error => {
      setMessage(`${rightPerson.name} ei löydy luettelosta`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
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
        filt={filter}
        handleRemove={handleRemove}
      />
    </div >
  )

}

export default App