import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let container
  let blog
  let mockNewBlog

  beforeEach(() => {
    blog = {
      title: 'blogTitle',
      author: 'blogAuthor',
      url: 'foo.bar'
    }
    mockNewBlog = jest.fn()
    container = render(<BlogForm newBlog={mockNewBlog} />).container
  })

  test('submits correct fields', async () => {
    const user = userEvent.setup()

    const titleInput = container.querySelector('#blog-title')
    await user.type(titleInput, blog.title)

    const authorInput = container.querySelector('#blog-author')
    await user.type(authorInput, blog.author)

    const urlInput = container.querySelector('#blog-url')
    await user.type(urlInput, blog.url)

    const sendButton = screen.getByText('create')
    await user.click(sendButton)

    expect(mockNewBlog.mock.calls).toHaveLength(1)

    expect(mockNewBlog.mock.calls[0][0]).toEqual(blog)
  })
})