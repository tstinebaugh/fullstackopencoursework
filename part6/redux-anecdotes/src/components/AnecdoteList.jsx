/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

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
    const anecdotes = useSelector(state => state)

    return(
        <div>
            {anecdotes.map(an =>
                <Anecdote
                key={an.id}
                anecdote={an}
                handleVote={() => 
                    dispatch(vote(an.id))}
                />
            )}
        </div>
    )
}

export default AnecdoteList