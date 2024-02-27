/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const NotifyReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload
    case "CLEAR":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationMessage = () => {
  const msgAndDispatch = useContext(NotificationContext)
  return msgAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const msgAndDispatch = useContext(NotificationContext)
  return msgAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [state, dispatch] = useReducer(NotifyReducer, '')

  return (
    <NotificationContext.Provider value={[state, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
