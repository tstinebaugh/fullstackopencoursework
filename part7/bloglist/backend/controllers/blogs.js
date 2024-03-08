const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (_request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!request.user) {
        return response.status(401).json({ error: 'token missing' })
    }
    
    blog.user = request.user.id
    const savedBlog = await blog.save()

    request.user.blogs = request.user.blogs.concat(savedBlog.id)
    await request.user.save()

    // Populate user info in blog
    savedBlog.user = request.user

    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
    if (!request.user) {
        return response.status(401).json({ error: 'token missing' })
    }    

    const blog = await Blog.findById(request.params.id).populate('user')
    if (!blog) {
        return response.status(404).json({error: `blog not found`})
    }

    if (blog.user.id.toString() !== request.user.id.toString()) {
        return response.status(401).json({ error: 'invalid token for deleting this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
    if (!request.user) {
        return response.status(401).json({ error: 'token missing' })
    } 
    
    const body = request.body
  
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(blog)
})

module.exports = blogRouter