import { useState } from 'react'

const Filter = ({value, onChange}) => {
  return(
    <div> 
        filter shown with <input
        value={value}
        onChange={onChange}></input>
    </div>

  )
}

const PersonForm = (props) => {
  return(<form onSubmit={props.onSubmit}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
          ></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}

const Persons = ({persons}) => {
  return(
    <ul>
        {persons.map(person => <div>{person.name} {person.number}</div>)}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [searchName, setSearchName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()

    if (!persons.some(person => person.name === newName)){

      const personObject = {
      name: newName,
      number:newNumber,
      id:String(persons.length +1)
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    console.log('button clicked');
    } else {
      window.alert(`${newName} is already added to phonebook`)
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
      <Persons persons= {filtNames}></Persons>
    </div>
  )
}

export default App