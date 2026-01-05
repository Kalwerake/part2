import { useState, useEffect } from 'react'

import Notification from './components/Notificaton'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [searchName, setSearchName] = useState('')

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

const handleDeleteEntry = id => {

    const person = persons.find(p => p.id === id)

    if (window.confirm(`delete ${person.name}`)){

      phonebookService
            .deleteEntry(id)
            .then(amendedData => {
              setPersons(persons.filter(person => person.id != amendedData.id))
            })
    }
  }


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
          name: newName,
          number:newNumber,
        }
    if (!persons.some(person => person.name === newName)){


        phonebookService
            .create(personObject)
            .then(returnedObject => {
              setPersons(persons.concat(returnedObject))
              setNotification(`Added ${newName}`)
              setNewName('')
              setNewNumber('')
              setTimeout(() => {
                setNotification(null)
              }, 5000)
                    }
                )
        } 
        else {
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
          
            const id = persons.find( p => p.name === newName).id
          
            phonebookService
                .update(id, personObject)
                .then(returnedObject => {
                  setPersons(persons.map(
                    person => person.id === id ? returnedObject : person
                  ))
                  setNotification(`${newName}'s number changed`)
                  setNewName('')
              setNewNumber('')
                })
                .catch(error => {
                  setNotification(`${newName} has already been removed from server`)
                  setPersons(persons.filter(n => n.id !== id))
                })
          }
        }  
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    
    setNewName(event.target.value)

  }
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    
    setNewNumber(event.target.value)

  }

  const handleSearchChange = (event) => {

    console.log(event.target.value);

    setSearchName(event.target.value)
  }

  const filtNames = searchName === '' ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}></Notification>
      <Filter 
        value={searchName}
        onChange={handleSearchChange}>
        </Filter>
      <h2>add a new</h2>
      <PersonForm 
      onSubmit = {addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <ul>
        {filtNames.map(
        (person) => (<Person 
                key= {person.id} 
                name= {person.name} 
                number = {person.number}
                deleteEntry={() => handleDeleteEntry(person.id)}/>
              ))
              }
      </ul>
      
    
    </div>
  )
}

export default App