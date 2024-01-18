const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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
        console.log(resp.body)
        expect(resp.body.likes).toEqual(0)
    })
})