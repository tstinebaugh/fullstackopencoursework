import { configureStore } from '@reduxjs/toolkit'

import NotifyReducer from './notifyReducer'
import BlogReducer from './blogReducer'
import LoginReducer from './loginReducer'

const Store = configureStore({
  reducer: {
    notify: NotifyReducer,
    blogs: BlogReducer,
    login: LoginReducer
  }
})

export default Store