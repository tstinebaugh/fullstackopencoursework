import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'

const Store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

export default Store