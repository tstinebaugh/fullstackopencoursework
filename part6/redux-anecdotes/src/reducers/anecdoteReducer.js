import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const sortAnecdotes = (anecdotes) => {
  anecdotes.sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState, 
  reducers: {
    createNew(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnec = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newAnecdotes = state.map(anec =>
        anec.id !== id ? anec : changedAnec
      )
      sortAnecdotes(newAnecdotes)
      return newAnecdotes
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createNew, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer