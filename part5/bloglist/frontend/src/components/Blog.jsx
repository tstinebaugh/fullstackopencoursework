import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  handleLike,
  handleDelete,
}) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
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
        <div>
          Title: {blog.title}
          <button onClick={toggleExpanded}> hide </button>
        </div>
        <div>Author: {blog.author}</div>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={() => handleLike(blog)}> like </button></div>
        <div>User: {blog.user?.username}</div>
        <div> <button onClick={() => handleDelete(blog)}> Delete </button></div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog