import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notifySlice = createSlice({ 
  name: 'notification',
  initialState,
  reducers: {
    addNotification(_state, action) {
      return action.payload
    },
    remoteNotification(_state, _action) {
        return ''
    }
  }
})
  
export const { addNotification, remoteNotification } = notifySlice.actions
export const sendNotification = (message, timeoutSecs) => {
  return async dispatch => {
    dispatch(addNotification(message))
    await new Promise(resolve => setTimeout(resolve, timeoutSecs * 1000))
    dispatch(remoteNotification())
  }
}
export default notifySlice.reducer