import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()

    if (!persons.some(person => person.name === newName)){

      const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    console.log('button clicked');
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
    
    
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    

    setNewName(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <div>{person.name}</div>)}
      </ul>
    </div>
  )
}

export default App