// Import required modules
// CRUD Server with Mongoose 
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')

const port = 8000
const url = 'mongodb://127.0.0.1:27017/accounts-db'

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))

mongoose.connect(url)
const accountSchema = mongoose.Schema({
    name : String,
    balance : Number
})

const Account = mongoose.model('Account', accountSchema)

app.get('/accounts', (req, res, next) => {
    Account.find({}, null, {sort: {_id: -1}}, (err, result) => {
        if(err) return next(err)
        res.status(200).send(result)
    })
})

app.get('/accounts/:id', (req, res, next) => {
    Account.findById(req.params.id, (err, result) => {
        if(err) return next(err)
        res.status(200).send(result.toJSON())
    })
})

app.post('/accounts', (req, res, next) => {
    let insertData = new Account(req.body)
    insertData.save((err, result) => {
        if(err) return next(err)
        res.status(201).send(result)
    })
})

app.put('/accounts/:id', (req, res, next) => {
    Account.findById(req.params.id, (err, result) => {
        if(err) return next(err)
        if(req.body.name) result.name = req.body.name
        if(req.body.balance) result.balance = req.body.balance
        result.save((err, r) => {
            res.status(204).send(r)
        })
    })
})

app.delete('/accounts/:id', (req, res, next) => {
    Account.findById(req.params.id, (err, result) => {
        if(err) return next(err)
        result.remove((err, r) => {
            res.status(204).send(r)
        })
    })
})

app.use(errorHandler())

console.log('The server is running at http://localhost:8000')

app.listen(port)