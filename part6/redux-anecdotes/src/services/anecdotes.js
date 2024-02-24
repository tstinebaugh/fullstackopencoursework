import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async (content) => {
  const object = { content, votes: 0 , id: getId()}
  const response = await axios.post(baseUrl, object)
  console.log(response.data)
  return response.data
}

const vote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdote = response.data
  anecdote.votes += 1
  const putReq = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return putReq.data
}

export default {
  getAll,
  createNew,
  vote
}