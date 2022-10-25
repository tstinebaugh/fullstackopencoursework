import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import AddForm from './components/AddForm'
import PeopleList from './components/PeopleList'
import contacts from './services/contacts'

const CheckIfNameAdded = (persons, newPerson) => {
  const filteredNames = persons.filter(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
  return filteredNames.length
}

const FilterPeople = (persons, searchKey) => {
  return persons.filter(person => person.name.toLowerCase().includes(searchKey.toLowerCase()))
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPeople, setFilteredPeople] = useState(persons) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const hook = () => {
    contacts.getAll()
      .then(contacts => {
        setPersons(contacts)
        setFilteredPeople(FilterPeople(contacts, filter))
      })
  }
  
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
    }
    const alreadyAdded = CheckIfNameAdded(persons, person)
    if (alreadyAdded > 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      contacts
      .create(person)
      .then(returnedPerson => {
        const people=persons.concat(returnedPerson)
        setPersons(people)
        setNewName('')
        setNewNumber('')
        setFilteredPeople(FilterPeople(people, filter))
      })
      
    }
  }

  const deletePerson = (id) => {
    contacts
      .remove(id)
      .then(response => {
        const people = persons.filter(p => p.id !== id)
        setPersons(people)
        setFilteredPeople(FilterPeople(people, filter))
      })
      .catch(error => {
        alert(
          `the contactwas already deleted from server`
        )
      })
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
        deletePerson={deletePerson}
      ></PeopleList>
    </div>
  )
}

export default App