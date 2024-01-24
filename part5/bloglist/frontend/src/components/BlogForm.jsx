import { useState } from 'react'

const BlogForm = ({newBlog}) => {
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setURL] = useState('') 

    const handleNewBlog = async (event) => {
        event.preventDefault()

        newBlog({title, author, url})
        setTitle('')
        setAuthor('')
        setURL('')
    }

    return (
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
}

export default BlogForm