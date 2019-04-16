import axios from 'axios'
import { resolve } from 'url';
//import react from 'react'

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {

  // Estää toisen samannimisen kaverin lisäämisen
/*   getAll().then(allPersons => {
    console.log("data:", allPersons)
    if (allPersons.map(persons => persons.name).includes(newObject.name)) {
      console.log("sama nimi")
      return allPersons.reject(`${newObject.name} on jo luettelossa`)
      //return persons.reject(new Error(`${newObject.name} on jo luettelossa`))
    }
  })
 */

  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  console.log("id:", id)
  const request = axios.delete(`${baseUrl}/${id}`)
  console.log("testiä", request.then(response => response.data))
  return request.then(response => response.data)
};

export default { getAll, create, update, remove }