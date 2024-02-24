import { useDispatch } from "react-redux"
import { createNew } from "../reducers/anecdoteReducer"
import { sendNotification } from "../reducers/NotifyReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
    
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        dispatch(createNew(content))
        dispatch(sendNotification(`Added ${content}`, 5))

    }

    return(
        <div>
            <h2>Create New</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}


export default AnecdoteForm