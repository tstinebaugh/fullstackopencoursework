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
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      id: persons.length + 1,
    }
    const alreadyAdded = CheckIfNameAdded(persons, person)
    if (alreadyAdded > 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(person))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </>
    </div>
  )
}

export default App