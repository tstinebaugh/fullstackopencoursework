import Person from './Person'

const PeopleList = ({ people, deletePerson }) => {
    return (
        <>
            {people.map(person => 
                <Person 
                  key={person.id} 
                  person={person} 
                  deletePerson={deletePerson}
                />
            )}
      </>
    )
  }
  
export default PeopleList



  