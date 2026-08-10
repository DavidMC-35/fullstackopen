const Filter = ({ newSearch, handleChange}) => { 
    return(
        <div>
            Filter shown with <input value={newSearch} onChange={handleChange} /> 
        </div>
    )
}


export default Filter