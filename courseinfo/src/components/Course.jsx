const Header = ({course}) => <h1>{course}</h1>

const Content = ({parts}) => (parts.map(part =>  <Part name= {part.name} exercises={part.exercises}> </Part>))

const Part = ({name, exercises}) => (<li>{name} {exercises}</li>)

const Total = ({parts}) => {
const exercises = parts.map(part => part.exercises)
const initialValue = 0
const total = exercises.reduce((sum, runningSum) => sum + runningSum, initialValue)
return (
  <b>total of {total} excercises</b>
)
}

const Course = ({course}) => {
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>


  )
}

export default Course