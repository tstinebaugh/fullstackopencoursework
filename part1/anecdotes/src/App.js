import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const VoteText = ({numVotes}) => (
  <div>has {numVotes} votes</div>
)

const Vote = (arr, idx) => {
  const copy = [ ...arr ]
  copy[idx] += 1
  return copy
}

const MostVotes = ({votes, anecdotes}) => {
  let mostVotes = -1
  let mvIdx = -1
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > mostVotes) {
      mostVotes = votes[i]
      mvIdx = i
    }
  }
  
  return <>
    {anecdotes[mvIdx]}
    <VoteText numVotes={mostVotes}/>
  </>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const setVote = (voteArr, sel) => {
    const afterVoting = Vote(voteArr, sel)
    setVotes(afterVoting)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <VoteText numVotes={votes[selected]}/>
      <div>
        <Button onClick={() => setVote(votes, selected)} text="vote"></Button>
        <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text={"next anecdote"}/>
      </div>
      <h2>Anecdote with most votes</h2>
      <MostVotes votes={votes} anecdotes={anecdotes}></MostVotes>
    </div>
  )
}

export default App