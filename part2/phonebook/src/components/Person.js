const Person = ({ person, deletePerson }) => {
    return (
      <div>
        {person.name} {person.number} <button type="submit" onClick={() => deletePerson(person)}>delete</button>
      </div>
    )
  }
  
export default Person