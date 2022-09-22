import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatsText = ({text, count}) => (
  <tr>
    <td>{text}</td>
    <td>{count}</td>
  </tr>
)

const Average = (good, neutral, bad) => {
  return (good - bad) / (good + neutral + bad)
}

const Positive = (good, neutral, bad) => {
  return good / (good + neutral + bad) * 100 + " %"
}

const Statistics = ({good, neutral, bad}) => {
  if(good + neutral + bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return(
    <table>
      <tbody>
        <StatsText text={'good'} count={good}/>
        <StatsText text={'neutral'} count={neutral}/>
        <StatsText text={'bad'} count={bad}/>
        <StatsText text={'all'} count={good+neutral+bad}/>
        <StatsText text={'average'} count={Average(good, neutral, bad)}/>
        <StatsText text={'positive'} count={Positive(good, neutral, bad)}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (setFunc, newValue) => {
    setFunc(newValue)
  }

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={() => setToValue(setGood, good+1)} text="good"/>
      <Button onClick={() => setToValue(setNeutral, neutral+1)} text="neutral"/>
      <Button onClick={() => setToValue(setBad, bad+1)} text="bad"/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App