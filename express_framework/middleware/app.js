// Import express framework
const express = require('express')

// Using an NPM middleware
const logger = require('morgan')

const port = 8000
// Instantiate an object 
const app = express()

app.use(logger('dev'))

// Middleware 1
app.use((req, res, next) => {
    console.log(`{method: ${req.method}, url: ${req.url}}`)
    next()
})

// Middleware 2
app.use((req, res, next) => {
    if(req.query.api_key){
        next()
    }
    else{
        res.status(401).send('Not authorized')
    }
})
// Define the default route, express is strict on routes.
app.get('/', (req, res) => {
    res.send('Hello World!') // send response, response.send() automatically adds headers and other metadata
})

// Middleware can also be defined inline to the routes
app.get('/testserver', (req, res, next) => {
    // Checks if API key is 1234, if true goes to the specified route, else goes to error handler
    if(req.query.api_key == '1234'){
        next()
    }
    else{
        next(error)
    }
},(req, res) => {
    res.send('You have landed on the test server page!')
})

app.get('/underconstruction', (req, res) => {
    res.send('This page is under construction!')
})

app.post('/underconstruction', (req, res) => {
    res.send('This page is under construction!')
})

// Middleware for handling error
const errorHandler = ((error, req, res, next) => {
    res.status(401).send('You are not authorized to view the test server!')
})

// Middleware can be stored and used as variables
app.use(errorHandler)


console.log('The server is running at http://localhost:8000/')

// Server bootup
app.listen(port)