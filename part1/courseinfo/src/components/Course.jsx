const Header = ({ course }) => {
  return(
    <h1>{course.name}</h1>
  )
}


const Part = ({ name, exercises }) => {
  return(
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}


const Total = ({ parts }) => {
  
  const total = parts.reduce((first, second) => {
      return first + second.exercises
  }, 0)
  return(
    <strong>
      <p>Number of exercises {total} </p>
    </strong>
  )
}

const Course = ({ course }) => {
  return(
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total parts={course.parts}/>

    </>

  )
}

export default Course