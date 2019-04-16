import React from 'react'

const Person = ({ person, handleRemove }) =>
    <li> {person.name} {person.number} <button onClick={handleRemove}>poista</button> </li>

const ViewPersons = ({ persons, filt, handleRemove }) => {

    //case insensitiivisen filtterin toteuttaminen puuttuu vielä
    const filteredNames = persons.filter(person => person.name.includes(filt))
 
    console.log("persons:::", persons)
    console.log("arvot", Object.values(persons))
    return (
        filteredNames.map(person => 
            <Person
                key={person.id}
                person={person}
                handleRemove={() => handleRemove(person.id)}
            />
        )
    )
}

export default ViewPersons