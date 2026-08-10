import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'


import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  const [notification, setNotification] = useState({message: null, type:null})

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 5000)
  }


  useEffect(()=> {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])  


  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
    if(persons.some(person => person.name === newName)){
      const existingPerson = persons.find(p => p.name === newName)
      if (window.confirm(`${newName} is already added to phonebool, replace old number with a new one?`)){
        
        personService.
          update(existingPerson.id, {...existingPerson, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
          })
          .catch(error => {
            showNotification(`Information of ${existingPerson.name} was already deleted from the server`, 'error')
          })

      } else {
        console.log("Not executed");
      }
    }else{
      const personObjetc = {
        name: newName,
        number: newNumber,
       }   

      personService
        .create(personObjetc)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Added ${personObjetc.name}`, 'success')
        })

      setNewName('')
      setNewNumber('')

    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    } else {
      console.log("Cancelled deletion");
    }
  }


  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleChange={handleSearchChange}/>

       <br />

      <h3>Add a new</h3>

      <Notification message={notification.message} type={notification.type} />

      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
      
    </div>
    
  )
}

export default App