import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import AddForm from './components/AddForm'
import PeopleList from './components/PeopleList'
import contacts from './services/contacts'
import Notification from './components/Notification'

const CheckIfNameAdded = (persons, newPerson) => {
  const filteredPeople = persons.filter(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
  return filteredPeople
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
  const [message, setMessage] = useState('')

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
    if (alreadyAdded.length > 0) {
      if (window.confirm(`${person.name} is already added to the phonebook, replace old number with a new one?`)){
        console.log(alreadyAdded)
        const changedPerson = { ...alreadyAdded[0], number: newNumber }
        contacts
        .update(changedPerson.id, changedPerson).then(returnedPerson => {
          const newPeople = persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson)
          setPersons(newPeople)
          setFilteredPeople(FilterPeople(newPeople, filter))
        }).catch(error => {
          console.log(error.response.data.error)
          setMessage({
            message: `${error.response.data.error}`,
            err: true
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    } else {
      contacts
      .create(person)
      .then(returnedPerson => {
        const people=persons.concat(returnedPerson)
        setPersons(people)
        setNewName('')
        setNewNumber('')
        setFilteredPeople(FilterPeople(people, filter))
        setMessage({
          message: `${returnedPerson.name} added to phonebook`,
          err: false
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setMessage({
          message: `${error.response.data.error}`,
          err: true
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)){
      contacts
      .remove(person.id)
      .then(() => {
        const people = persons.filter(p => p.id !== person.id)
        setPersons(people)
        setFilteredPeople(FilterPeople(people, filter))
      })
      .catch(error => {
        setMessage({
          message: `${error}`,
          err: true
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
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
      <Notification message={message}></Notification>
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