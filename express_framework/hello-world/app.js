// Import express framework
const express = require('express')
const port = 8000
// Instantiate an object 
const app = express()

// Define the default route, express is strict on routes. Now sending a request to http://localhost:8000/ 
// will not give a response but an error 
app.get('/testserver', (req, res) => {
    res.send('Hello World!') // send response, response.send() automatically adds headers and other metadata
})

console.log('The server is running at http://localhost:8000/')

// Server bootup
app.listen(port)