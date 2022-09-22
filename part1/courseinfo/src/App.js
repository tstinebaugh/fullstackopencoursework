const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Body = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises: {props.count}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header courseName={course.name} />
      <Body part={course.parts[0]} />
      <Body part={course.parts[1]} />
      <Body part={course.parts[2]} />
      <Total count={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </>
  )
}

export default App