// Import required modules 
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
// Imports the functions exported in the index.js of /routes/
const routes = require('./routes')
const port = 8000

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

// Sample blog post 
let blog = {
    'posts': [
      {'name': 'Top 10 ES6 Features every Web Developer must know',
      'url': 'https://webapplog.com/es6',
      'text': 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      'comments': [
        {'text': 'Cruel…..var { house, mouse} = No type optimization at all'},
        {'text': 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
        {'text': '(p1,p2)=>{ … } ,i understand this ,thank you !'}      
      ]
      }
    ]
  }

// Assign to request 
app.use((req, res, next) => {
    req.blog = blog
    next()
})

// Routes for posts
app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)
app.put('/posts/:id', routes.posts.updatePost)
app.delete('/posts/:id', routes.posts.deletePost)

// Routes for comments 
app.get('/posts/:id/comments', routes.comments.getComments)
app.post('/posts/:id/comments', routes.comments.addComment)
app.put('/posts/:id/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:id/comments/:commentId', routes.comments.deleteComment)

console.log('The server is running at http://localhost:8000/')

app.listen(port)