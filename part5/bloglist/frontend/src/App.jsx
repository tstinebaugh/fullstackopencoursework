import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const loginTokenName = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setURL] = useState('') 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loginTokenName)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(loginTokenName, JSON.stringify(user)) 
      loginService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const resp = await blogService.post({title, author, url}, user.token)
    setInfoMessage(`A new blog ${title} by ${author} added`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    setBlogs([...blogs, resp])
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const createNewBlog = () => (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title: <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        </div>
        <div>
          author: <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        </div>
        <div>
          URL: <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setURL(target.value)}
        />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const logOut = () => {
    window.localStorage.removeItem(loginTokenName)
    setUser(null)
  }
    
  const loggedIn = () => {
    return (
      <div>
        <p>{user.name} logged in</p>
        <button onClick={() => logOut()}>
          logout
        </button>
        {createNewBlog()}
        <h2>blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} /> 
      <Notification message={infoMessage} />
      {!user && loginForm()} 
      {user && loggedIn()}
    </div>
  )
}

export default App