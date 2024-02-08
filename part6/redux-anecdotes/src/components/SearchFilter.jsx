import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const style = {
    marginBottom: 10
}

const VisibilityFilter = (_props) => {
    const dispatch = useDispatch()

    const handleChange = event => {
        dispatch(filterChange(event.target.value))
    };

    return (
    <div>
        Filter: 
        <input
        name="anecdoteFilter"
        style={style}
        onChange={handleChange}
        />
    </div>
    )
}

export default VisibilityFilter