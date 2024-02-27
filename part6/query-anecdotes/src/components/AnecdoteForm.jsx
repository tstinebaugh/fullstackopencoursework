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
    newAnecdoteMutation.mutate(content)
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: async (newAnecdote) => {
      dispatch({ 
        type: "ADD", 
        payload: `Created ${newAnecdote}`
      })
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes', anecdotes.concat(newAnecdote)])
      queryClient.invalidateQueries(['anecdotes'])
      await new Promise(resolve => setTimeout(resolve, 5 * 1000))
      dispatch({ type: "CLEAR" })
    },
    onError: async (err) => {
      dispatch({ 
        type: "ADD", 
        payload: `Anecdote too short, must contain 5 characters or more`
      })
      console.log(err)
      await new Promise(resolve => setTimeout(resolve, 5 * 1000))
      dispatch({ type: "CLEAR" })
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
