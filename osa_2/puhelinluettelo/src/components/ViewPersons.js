import React from 'react'
//import RenderPerson from './RenderPerson'

const Person = ({ person, handleRemove }) =>
    <li> {person.name} {person.number} <button onClick={handleRemove}>poista</button> </li>

const ViewPersons = ({ persons, filter, handleRemove }) => {

    //case insensitiivisen filtterin toteuttaminen puuttuu vielä
    const filteredNames = persons.filter(person => person.name.includes(filter))

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