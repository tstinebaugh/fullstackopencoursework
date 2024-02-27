/* eslint-disable react/jsx-key */
import { useQuery, useMutation, useQueryClient, QueryClient  } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, putAnecdote } from './services/request'
import { NotificationContextProvider, useNotificationDispatch } from './notificationContext'
import Anecdote from './components/anecdote'


const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContextProvider>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote}/>
      )}
    </NotificationContextProvider>
  )
}

export default App
