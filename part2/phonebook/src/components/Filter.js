const Filter = ({ val, handleFunc }) => {
    return (
        <div>
        filter by: <input 
          value={val}
          onChange={handleFunc}
        />
      </div>
    )
  }
  
export default Filter