import { createAnecdote } from '../services/request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({ 
      type: "ADD", 
      payload: `Created ${content}`
    })
    newAnecdoteMutation.mutate(content)
    await new Promise(resolve => setTimeout(resolve, 5 * 1000))
    dispatch({ type: "CLEAR" })
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes', anecdotes.concat(newAnecdote)])
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
