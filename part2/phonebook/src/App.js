import { useState } from 'react'
import Person from './components/Person'

const CheckIfNameAdded = (persons, newPerson) => {
  const filteredNames = persons.filter(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
  return filteredNames.length
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
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
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
    const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredPeople(filteredPeople)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter by: <input 
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <h2>Add New Contact</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {filteredPeople.map(person => 
          <Person key={person.id} person={person} />
        )}
      </>
    </div>
  )
}

export default App