/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { sendNotification } from "../reducers/NotifyReducer"

const Anecdote = ({anecdote, handleVote}) => {
    return(
        <div>
             <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if (filter === '') {
            return anecdotes
        }
        return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    return(
        <div>
            {anecdotes.map(an =>
                <Anecdote
                key={an.id}
                anecdote={an}
                handleVote={async () => {
                    dispatch(vote(an.id))
                    dispatch(sendNotification(`Voted for ${an.content}`, 5))
                    }
                }
                    
                />
            )}
        </div>
    )
}

export default AnecdoteList