const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (_request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    console.log('blogRouter.post reached')
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogRouter