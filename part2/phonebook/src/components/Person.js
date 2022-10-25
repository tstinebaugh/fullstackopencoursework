const Person = ({ person, deletePerson }) => {
    return (
      <div>
        {person.name} {person.number} <button type="submit" onClick={() => deletePerson(person.id)}>delete</button>
      </div>
    )
  }
  
export default Person