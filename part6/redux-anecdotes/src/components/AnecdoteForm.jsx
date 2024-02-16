import { useDispatch } from "react-redux"
import { createNew } from "../reducers/anecdoteReducer"
import { addNotification, remoteNotification } from "../reducers/NotifyReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
    
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createNew(newAnecdote))
        dispatch(addNotification(`Added ${content}`))
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 sec
        dispatch(remoteNotification())
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