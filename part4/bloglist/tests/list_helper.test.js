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


describe('most blogs', () => {
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

  const multipleBlogsSameAuthor = [
    ...listWithOneBlog,
    {
      _id: '123',
      title: 'title2',
      author: 'Edsger W. Dijkstra',
      url: 'blah',
      likes: 2,
      __v: 0
    }
  ]

  const diffAuthors = [
    ...multipleBlogsSameAuthor,
    {
      _id: '234',
      title: 'title4',
      author: 'Bob Smith',
      url: 'fancyurl',
      likes: 8,
      __v: 0
    },
    {
      _id: '434',
      title: 'title3',
      author: 'Bob Smith',
      url: 'fancyurl',
      likes: 8,
      __v: 0
    },
    {
      _id: '235',
      title: 'title5',
      author: 'Bob Smith',
      url: 'fancyurl',
      likes: 8,
      __v: 0
    }
  ]

  test('nil blogs', () => {
    const result = listHelper.mostBlogs(null)
    expect(result).toEqual(null)
  })

  test('empty blogs', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual([])
  })

  test('one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    })
  })

  test('multiple blogs', () => {
    const result = listHelper.mostBlogs(multipleBlogsSameAuthor)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 2
    })
  })

  test('diff authors', () => {
    const result = listHelper.mostBlogs(diffAuthors)
    expect(result).toEqual({
      author: "Bob Smith",
      blogs: 3
    })
  })

})

describe('mostLikes', () => {
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

  const multipleBlogsSameAuthor = [
    ...listWithOneBlog,
    {
      _id: '123',
      title: 'title2',
      author: 'Edsger W. Dijkstra',
      url: 'blah',
      likes: 2,
      __v: 0
    }
  ]

  const diffAuthors = [
    ...multipleBlogsSameAuthor,
    {
      _id: '234',
      title: 'title3',
      author: 'Bob Smith',
      url: 'fancyurl',
      likes: 8,
      __v: 0
    }
  ]

  test('nil blogs', () => {
    const result = listHelper.mostLikes(null)
    expect(result).toEqual(null)
  })

  test('empty blogs', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual([])
  })

  test('one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      likes: 5,
      author: listWithOneBlog[0].author
    })
  })

  test('multiple blogs', () => {
    const result = listHelper.mostLikes(multipleBlogsSameAuthor)
    expect(result).toEqual({
      likes: 7,
      author: listWithOneBlog[0].author
    })
  })

  test('diff authors', () => {
    const result = listHelper.mostLikes(diffAuthors)
    expect(result).toEqual({
      likes: 8,
      author: "Bob Smith"
    })
  })

})