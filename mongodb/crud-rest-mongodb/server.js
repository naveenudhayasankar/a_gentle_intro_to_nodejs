// CRUD server using Express and MongoDB
const express = require('express')
const Mongo = require('mongodb')
const logger = require('morgan')
const bodyParser = require('body-parser')
const port = 8000
var ObjectID = Mongo.ObjectID; 

const app = express()
app.use(logger('dev'))

app.use(bodyParser.json())

const url = "mongodb://127.0.0.1:27017/"
const client = Mongo.MongoClient

client.connect(url, (error, dbClient) => {
    if(error) return process.exit(1)
    const db = dbClient.db('crud-db')
    
    app.get('/accounts', (req, res, next) => {
        db.collection('accounts').find({}, {sort: {_id: -1}}).toArray((error, result) => {
            if(error) next(error)
            console.log(`Found ${result.length} record(s)`)
            res.status(200).send(result)
        })
    })

    app.post('/accounts', (req, res, next) => {
        var insertData = req.body
        db.collection('accounts').insertMany(insertData, (error, result) => {
            if(error) next(error)
            console.log(`Inserted ${result.insertedCount} record(s)`)
            res.status(201).send(result)
        })
    })

    app.put('/accounts/:id', (req, res, next) => {
        var updateData = req.body
        console.log(req.body)
        db.collection('accounts').updateOne({_id : ObjectID(req.params.id)}, {$set : updateData}, (error, result) => {
            if(error) next(error)
            console.log(`Updated ${result.modifiedCount} record(s)`)
            res.status(204).send(result)
        })
    })

    app.delete('/accounts/:id', (req, res, next) => {
        db.collection('accounts').deleteOne({'_id' : ObjectID(req.params.id)}, (error, result) => {
            if(error) next(error)
            console.log(`Removed ${result.deletedCount} record(s)`)
            res.status(204).send(result)
        })
    })
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    res.status(500).send()
}
app.use(errorHandler)

console.log('The server is running at http://localhost:8000/')
app.listen(port)