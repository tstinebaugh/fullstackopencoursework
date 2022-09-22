const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <b>Total of {sum} exercises</b>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part =>
      <Part key={part.id}
        part={part}
      />
    )}
  </>

const Course = ({ course }) => {
  const sum = course.parts.reduce((total, value) => total + value.exercises, 0)
  return (
    <>
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total sum={sum}></Total>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {courses.map(course =>
        <Course key = {course.id} course={course} />
      )}
    </>
  )
}


export default App