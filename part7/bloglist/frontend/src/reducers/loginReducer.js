import { createSlice } from '@reduxjs/toolkit'
import loginService from "../services/login";

const initialState = []

const loginSlice = createSlice({
  name: 'login',
  initialState, 
  reducers: {
    // appendBlog(state, action) {
    //   state.push(action.payload)
    // },
    // setBlogs(state, action) {
    //   return action.payload
    // },
    // updateBlogs(state, action){
    //   const update = action.payload
    //   const newBlogs = state.map(b =>
    //     b.id !== update.id ? b : update
    //   )
    //   sortBlogs(newBlogs)
    //   return newBlogs
    // }
  }
})

// export const { appendBlog, setBlogs, updateBlogs } = blogSlice.actions

// export const initializeBlogs = () => {
//   return async dispatch => {
//     const blogs = await blogService.getAll()
//     dispatch(setBlogs(blogs))
//   }
// }

// export const createNew = content => {
//   return async dispatch => {
//     const newBlog = await blogService.post(content)
//     console.log(newAnecdote)
//     dispatch(appendBlog(newBlog))
//   }
// }

// export const vote = blog => {
//   return async dispatch => {
//     const votedblog = {
//         ...blog,
//         votes: blog.votes + 1
//     }
//     const updatedBlog = await blogService.put(votedblog)
//     dispatch(updateBlogs(updatedBlog))
//   }
// }

export default loginSlice.reducer