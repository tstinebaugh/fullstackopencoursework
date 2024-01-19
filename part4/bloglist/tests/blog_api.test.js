const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('app test', () => {
    test('id property correctly formatted', async () => {
        const apiResp = await api.get('/api/blogs')
        expect(apiResp.type).toContain('application/json')
        expect(apiResp.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('id property correctly formatted', async () => {
        const resp = await api.get('/api/blogs')
        expect(resp.body[0].id).toBeDefined()
    })

    test('new blog post is created', async () => {
        const newBlog = {
            title: "foo",
            author: "bar",
            url: "baz",
            likes: 42
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('default likes is 0 if omitted', async () => {
        const newBlog = {
            title: "foo",
            author: "bar",
            url: "baz",
        }

        const resp = await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        expect(resp.body.likes).toEqual(0)
    })

    test('blog not created if title omitted', async () => {
        const newBlog = {
            author: "bar",
            url: "baz",
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('blog not created if url omitted', async () => {
        const newBlog = {
            title: "foo",
            author: "bar",
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('delete a blog post', async () => {
        const blogs = await helper.blogsInDb()
        const deleteId = blogs[0].id
        await api.delete(`/api/blogs/${deleteId}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const contents = blogsAtEnd.map(b => b.id)
        expect(contents).not.toContain(deleteId)
    })

    test('update a blog post', async () => {
        const blogs = await helper.blogsInDb()
        const updateBlog = blogs[0]
                
        updateBlog.likes = updateBlog.likes + 37
                
        await api.put(`/api/blogs/${updateBlog.id}`)
            .send(updateBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toContainEqual(updateBlog)
    })

    describe('when there is initially one user in db', () => {  
        beforeEach(async () => {
            await User.deleteMany({})
        
            const passwordHash = await bcrypt.hash('sekret', 10)
            const user = new User({ username: 'root', passwordHash })
        
            await user.save()
          })
        
          test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await helper.usersInDb()
        
            const newUser = {
              username: 'mluukkai',
              name: 'Matti Luukkainen',
              password: 'salainen',
            }
        
            await api
              .post('/api/users')
              .send(newUser)
              .expect(201)
              .expect('Content-Type', /application\/json/)
        
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        
            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
          })
        test('creation fails with proper statuscode and message if username already taken', async () => {
          const usersAtStart = await helper.usersInDb()
      
          const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
          }
      
          const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
      
          expect(result.body.error).toContain('expected `username` to be unique')
      
          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toEqual(usersAtStart)
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})