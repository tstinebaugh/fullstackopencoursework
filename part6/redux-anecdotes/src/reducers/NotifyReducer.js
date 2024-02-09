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
export default notifySlice.reducer