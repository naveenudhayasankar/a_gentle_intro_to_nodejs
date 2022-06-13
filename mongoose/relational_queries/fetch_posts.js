// Required modules
const mongoose = require('mongoose')

// Connection string
const url = 'mongodb://127.0.0.1:27017/blog-posts'
mongoose.Promise = global.Promise
mongoose.connect(url)

// Child object - Comment
const Comment = mongoose.model('comments', {
    text : String
})

// Parent object - Post
const Post = mongoose.model('posts', {
    name : String, 
    author : String, 
    text : String, 
    comments: [{type : mongoose.Schema.Types.ObjectId, ref : 'comments'}]
})

let comm_arr = [{
    text : 'First comment entered'
}, {
    text : 'Is the second comment posted yet?'
}, {
    text : 'NVM, the third comment is already posted!!'
}].map((comm) => {
    const c = new Comment(comm)
    c.save()
    return c._id
})

console.log(comm_arr)

var post = new Post({
    name: 'Post 1',
    author: 'Self',
    text: 'First post, comments are welcome!',
    comments: comm_arr
})

// Fetching a post will also fetch the referenced comments
post.save((err, result) => {
    if(err) console.error(err.message)
    console.log(`Post saved`)
    Post.findOne({name : /Post 1/}).populate('comments').
    exec(function(err, results){
        if(err) console.error(err.message)
        console.log(results)
        mongoose.disconnect()
    })
})


