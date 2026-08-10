const Persons = ({ filteredPersons, handleDelete }) => {
    return(
        <div>
            {filteredPersons.map(p => (
                <div key={p.id}>
                    <p>{p.name} {p.number}</p>
                    <button onClick={() => handleDelete(p.id)}>Delete</button> 
                </div>
            ))}
        </div>
    )
}

export default Persons