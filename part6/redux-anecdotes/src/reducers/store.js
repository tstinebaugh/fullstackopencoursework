import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import NotifyReducer from './NotifyReducer'

const Store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notify: NotifyReducer
  }
})

export default Store