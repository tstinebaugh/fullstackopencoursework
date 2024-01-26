import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let blog
  let mockLike
  let mockDelete

  beforeEach(() => {
    blog = {
      title: 'blogTitle',
      author: 'blogAuthor',
      likes: 56,
      url: 'foo.bar',
      id: '1234'
    }
    mockLike = jest.fn()
    mockDelete = jest.fn()

    container  = render(<Blog blog={blog} handleLike={mockLike} handleDelete={mockDelete} />).container
  })

  test('renders content', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(`${blog.title}`)
    expect(div).toHaveTextContent(`${blog.author}`)
    expect(div).not.toHaveTextContent(`${blog.id}`)

    const invis = container.querySelector('.togglableContent')
    expect(invis).toHaveStyle('display: none')
    expect(invis).toHaveTextContent(`${blog.likes}`)
    expect(invis).toHaveTextContent(`${blog.url}`)
  })

  test('view button works', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('like button works', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})