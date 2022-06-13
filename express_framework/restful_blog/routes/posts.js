// Export all the functions for posts
module.exports = {
    getPosts(req, res) {
        if(req.query.id) return res.status(200).send(req.blog.posts[req.query.id])
        res.status(200).send(req.blog.posts)
    },
    addPost(req, res) {
        let post = req.body
        let id = req.blog.posts.length
        req.blog.posts.push(post)
        res.status(201).send({'Post ID': id})
    },
    updatePost(req, res) {
        let id = req.params.id
        let updatedPost = req.body
        Object.assign(req.blog.posts[id], updatedPost)
        res.status(204).send(`Post with id ${id} is updated`)
    },
    deletePost(req, res) {
        let id = req.params.id
        req.blog.posts.splice(id, 1)
        res.status(204).send(`Post with id ${id} is deleted`)
    }
}