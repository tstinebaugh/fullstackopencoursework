import React from 'react'
import PropTypes from 'prop-types'

const Person = ({ person, deletePerson }) => {
    return (
      <div>
        {person.name} {person.number} <button type="submit" onClick={() => deletePerson(person)}>delete</button>
      </div>
    )
  }

Person.propTypes = {
  person: PropTypes.any.isRequired,
  deletePerson: PropTypes.func.isRequired,
}

export default Person