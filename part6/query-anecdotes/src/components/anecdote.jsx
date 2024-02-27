import { useMutation, useQueryClient } from '@tanstack/react-query'

import { putAnecdote } from '../services/request'
import { useNotificationDispatch } from '../notificationContext'

const Anecdote = ({ anecdote }) => {
    const queryClient = useQueryClient()

    const voteAnecdoteMutation = useMutation({
        mutationFn: putAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    const dispatch = useNotificationDispatch()

    const handleVote = async (anecdote) => {
        dispatch({
            type: "ADD",
            payload: `Voted For ${anecdote.content}`
        })
        voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        await new Promise(resolve => setTimeout(resolve, 5 * 1000))
        dispatch({ type: "CLEAR" })
    }

    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

export default Anecdote
