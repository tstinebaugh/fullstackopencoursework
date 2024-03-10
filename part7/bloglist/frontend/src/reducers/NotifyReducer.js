import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notifySlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(_state, action) {
      return action.payload
    },
    removeNotification(_state, _action) {
      return ''
    }
  }
})

export const { addNotification, removeNotification } = notifySlice.actions
export const infoNotification = (message, timeoutSecs) => {
  console.log('info notification')

  return async dispatch => {
    dispatch(addNotification({
      type: 'INFO',
      content: message
    }))
    await new Promise(resolve => setTimeout(resolve, timeoutSecs * 1000))
    dispatch(removeNotification())
  }
}

export const errorNotification = (message, timeoutSecs) => {
  return async dispatch => {
    dispatch(addNotification({
      type: 'ERROR',
      content: message
    }))
    await new Promise(resolve => setTimeout(resolve, timeoutSecs * 1000))
    dispatch(removeNotification())
  }
}

export default notifySlice.reducer