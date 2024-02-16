import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import SearchFilter from './components/SearchFilter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import anecdoteServices from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteServices.getAll()
      .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <SearchFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App