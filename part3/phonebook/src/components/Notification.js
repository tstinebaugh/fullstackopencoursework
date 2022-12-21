import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
    if (!message) {
        return null
    }

    const notificationStyle = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    message.err ? notificationStyle.color = 'red' : notificationStyle.color = 'green'

    return (
        <div style={notificationStyle}>
        {message.message}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
}

export default Notification