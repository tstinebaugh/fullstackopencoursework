import React from 'react'
import PropTypes from 'prop-types'

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

PeopleList.propTypes = {
  people: PropTypes.array,
  deletePerson: PropTypes.func.isRequired,
}

export default PeopleList