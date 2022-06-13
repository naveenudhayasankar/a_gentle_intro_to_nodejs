// Import required modules
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const port = 8000

// Instantiate the framework
const app = express()

// Object to perform CRUD on, array of jsons
var profile = [{
    'name' : 'empty',
    'email' : 'empty',
    'url' : 'empty'
}]


app.use(bodyParser.json())
app.use(logger('dev'))

// Input validation for POST and PUT requests
const validate = (req, res, next) => {
    if(!req.body.name.trim() || !req.body.email.trim()) return res.sendStatus(404)
    else next()
}
// CRUD operation handlers

//Send the entire array if querystring id is not specified else send the specified element in the response
app.get('/profile', (req, res) => {
    if(req.query.id) return res.send(profile[req.query.id])
    res.send(profile)
})

// Post requests just push the new json objects into the profile array 
app.post('/profile', validate, (req, res) => {
    let jsonObj = {
        'name' : req.body.name,
        'email' : req.body.email,
        'url' : req.body.url 
    }
    profile.push(jsonObj)
    console.log('created : ',jsonObj)
    res.sendStatus(201)
})

// Put updated the json object in the array specified by the URL parameter id
app.put('/profile/:id', validate, (req, res) => {
    Object.assign(profile[req.params.id], req.body)
    console.log('updated : ',profile[req.params.id])
    res.sendStatus(204)
})

// Delete uses array splice to delete the json object specified by the URL parameter id from the profile array
app.delete('/profile/:id', (req, res) => {
    var deleted = profile[req.params.id]
    profile.splice(req.params.id, 1)
    console.log('deleted : ', deleted)
    res.sendStatus(204)
})

console.log('The server is running at http://localhost:8000/')

app.listen(port)