const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return (!blogs || blogs.length === 0) ? 
    0 :
    blogs.reduce((sum, item) => {
        return sum + ((item && item.likes) ? item.likes : 0)
    }, 0)
}

const favoriteBlog = (blogs) => {
    let maxLikes = -1
    let highestBlog
    blogs && blogs.forEach(blog => {
        if (blog && blog.likes && blog.likes > maxLikes) {
            maxLikes = blog.likes
            highestBlog = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })
    return highestBlog
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}