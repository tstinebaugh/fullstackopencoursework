const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithNoLikes = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      __v: 0
    }
  ]

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleLikes = [
    ...listWithOneBlog,
    {
      likes: 1,
    },
    {
      likes: 2,
    },
    {
      likes: 3,
    },
    {
      likes: 4,
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('blogs is nil', () => {
    const result = listHelper.totalLikes(listWithNoLikes)
    expect(result).toBe(0)
  })

  test('multiple blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleLikes)
    expect(result).toBe(15)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const multipleBlogs = [
    ...listWithOneBlog,
    {
      title: 'post 2',
      author: 'bob',
      url: 'google.com',
      likes: 42
    },
    {
      title: 'post 3',
      author: 'smith',
      url: 'google.com',
      likes: 1
    }
  ]

  test('null blogs', () => {
    const result = listHelper.favoriteBlog(null)
    expect(result).toBe(undefined)
  })

  test('no blogs', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

  test('one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    })
  })

  test('multiple blogs', () => {
    const result = listHelper.favoriteBlog(multipleBlogs)
    expect(result).toEqual({
      title: multipleBlogs[1].title,
      author: multipleBlogs[1].author,
      likes: multipleBlogs[1].likes
    })
  })
})
