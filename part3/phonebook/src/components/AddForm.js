import React from 'react'
import PropTypes from 'prop-types'

const AddForm = (props) => {
    return (
        <form onSubmit={props.addName}>
            <div>
            name: <input
                value={props.newName}
                onChange={props.handleNameChange}
            />
            </div>
            <div>
            number: <input
                value={props.newNumber}
                onChange={props.handleNumberChange}
            />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
  }

AddForm.propTypes = {
    addName: PropTypes.func.isRequired,
    newName: PropTypes.func.isRequired,
    newNumber: PropTypes.func.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    handleNumberChange: PropTypes.func.isRequired,
}

export default AddForm