import axios from 'axios'
//import react from 'react'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {

  // Estää toisen samannimisen kaverin lisäämisen
  /*   getAll().then(persons => {
      console.log("data:", persons) 
      if (persons.map(person => person.name).includes(newObject.name)) {
        return PromiseRejectionEvent
      }
    })  */

  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }