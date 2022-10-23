import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import AddForm from './components/AddForm'
import PeopleList from './components/PeopleList'

const CheckIfNameAdded = (persons, newPerson) => {
  const filteredNames = persons.filter(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
  return filteredNames.length
}

const FilterPeople = (persons, searchKey) => {
  return persons.filter(person => person.name.toLowerCase().includes(searchKey.toLowerCase()))
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '123.456.7890',
      id: 1
    }
  ]) 
  const [filteredPeople, setFilteredPeople] = useState(persons) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setFilteredPeople(FilterPeople(response.data, filter))
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'people')

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    const alreadyAdded = CheckIfNameAdded(persons, person)
    if (alreadyAdded > 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const people =persons.concat(person)
      setPersons(people)
      setNewName('')
      setNewNumber('')
      setFilteredPeople(FilterPeople(people, filter))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setFilteredPeople(FilterPeople(persons, event.target.value))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter val={filter} handleFunc={handleFilterChange}></Filter>
      <h2>Add New Contact</h2>
      <AddForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></AddForm>
      <h2>Numbers</h2>
      <PeopleList
        people={filteredPeople}
      ></PeopleList>
    </div>
  )
}

export default App