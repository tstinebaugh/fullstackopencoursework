import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortAnecdotes = (anecdotes) => {
  anecdotes.sort((a, b) => b.votes - a.votes)
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState, 
  reducers: {
    createNew(state, action) {
      state.push(asObject(action.payload))
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
    }
  }
})

export const { createNew, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer