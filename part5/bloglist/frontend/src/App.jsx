import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      sortBlogs(blogs)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loginTokenName)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  const sortBlogs = (blogs) => {
    blogs.sort((a, b) => b.likes - a.likes)
  }

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const resp = await blogService.post(blogObject, user.token)
    setInfoMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
    setBlogs(blogs.concat(resp))
  }

  const like = async (blogObject) => {
    blogObject.likes += 1
    const resp = await blogService.put(blogObject, user.token)
    const updatedBlogs = blogs.map(b => {
      if (b.id === blogObject.id) {
        return {
          ...b,
          likes: resp.likes
        }
      }
      return b
    })
    sortBlogs(updatedBlogs)
    setBlogs(updatedBlogs)
  }

  const handleDelete = async (blogObject) => {
    if (!confirm(`Are you sure you want to delete ${blogObject.title} by ${blogObject.author}?`)) {
      return
    }
    try {
      await blogService.remove(blogObject, user.token)
      setBlogs(blogs.filter(b =>
        b.id !== blogObject.id
      ))
    } catch (exception) {
      setErrorMessage('error deleting blog')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createNewBlog = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm newBlog={addBlog}/>
    </Togglable>
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
        {blogs.map(
          blog => <Blog
            key={blog.id}
            blog={blog}
            handleLike={like}
            handleDelete={handleDelete} />
        )}
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