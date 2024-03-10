import { configureStore } from '@reduxjs/toolkit'

import NotifyReducer from './NotifyReducer'

const Store = configureStore({
  reducer: {
    notify: NotifyReducer
  }
})

export default Store