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
        console.log(apiResp)
        expect(apiResp.type).toContain('application/json')
        expect(apiResp.body).toHaveLength(helper.initialBlogs.length)
    })
    
    // test('id property correctly formatted', async () => {
    //     const resp = await api.get('/api/blogs')
    //     expect(resp.body).toBeNull()
    // })
})