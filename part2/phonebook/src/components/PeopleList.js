import Person from './Person'

const PeopleList = ({ people }) => {
    return (
        <>
            {people.map(person => 
                <Person key={person.id} person={person} />
            )}
      </>
    )
  }
  
export default PeopleList



  