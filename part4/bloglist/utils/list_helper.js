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
  
module.exports = {
    dummy,
    totalLikes
}