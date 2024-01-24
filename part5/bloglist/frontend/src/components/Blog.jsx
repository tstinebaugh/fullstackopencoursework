import { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const like = () => {
    console.log('like!')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenExpanded}>
        {blog.title} {blog.author} 
        <button onClick={toggleExpanded}> view </button>
      </div>
      <div style={showWhenExpanded}>
        <div>Title: {blog.title}</div> 
        <div>Author: {blog.author}</div>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={like}> like </button></div>
        <div>User: {blog.user?.username}</div>
        <button onClick={toggleExpanded}> hide </button>
      </div>
    </div>  
  )
}

export default Blog