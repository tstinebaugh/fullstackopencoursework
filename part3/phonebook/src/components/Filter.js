import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({ val, handleFunc }) => {
  return (
      <div>
      filter by: <input
        value={val}
        onChange={handleFunc}
      />
    </div>
  )
}

Filter.propTypes = {
  val: PropTypes.string,
  handleFunc: PropTypes.func.isRequired,
}

export default Filter