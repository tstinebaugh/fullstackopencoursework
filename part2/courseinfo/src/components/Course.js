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

export default Course