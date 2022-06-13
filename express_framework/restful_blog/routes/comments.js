// Export all the functions for comments 
module.exports = {
    getComments(req, res) {
        let postId = req.params.id
        let post = req.blog.posts[postId]
        let comments = post.comments
        if(req.query.commentId) return res.status(200).send(comments[req.query.commentId])
        res.status(200).send(comments)
    },
    addComment(req, res) {
        let postId = req.params.id
        let post = req.blog.posts[postId]
        let commentId = post.comments.length
        post.comments.push(req.body)
        res.status(201).send(`New comment with id ${commentId} added`)
    },
    updateComment(req, res) {
        let postId = req.params.id
        let post = req.blog.posts[postId]
        let commentId = req.params.commentId
        Object.assign(post.comments[commentId], req.body)
        res.status(204).send(`Comment ${commentId} is updated`)
    },
    deleteComment(req, res) {
        let postId = req.params.id
        let post = req.blog.posts[postId]
        let commentId = req.params.commentId
        let comments = post.comments
        comments.splice(commentId, 1)
        res.status(204).send(`Comments ${commentId} is deleted`)
    }
}