// CRUD script using MongoDB
const Mongo = require('mongodb')
const client = Mongo.MongoClient

const url = "mongodb://127.0.0.1:27017/"

const handleError = (error) => {
    console.log(error.message)
    return process.exit(1)
}

client.connect(url, (error, dbClient) => {
    if(error) {
        handleError(error)
    }
    const db = dbClient.db('test-db')
    console.log('Database connected successfully!!!')
    insert(db, () => {
        update(db, () => {
            remove(db, () => {
                find(db, () => {
                    dbClient.close()
                })
            })
        })
    })
})

const insert = (db, callback) => {
    const collection = db.collection('test-db')
    collection.insertMany([{name : 'John'}, {name : 'Peter'}, {name : 'Bob'}], (error, result) => {
        if(error) {
            handleError(error)
        }
        console.log(result.insertedCount)
        console.log(`Inserted ${result.insertedCount} record(s)`)
        callback(result)
    })
}

const update = (db, callback) => {
    var collection = db.collection('test-db')
    const name = 'Peter'
    collection.updateMany({name : name}, {$set : {grade : 'A'}}, (error, result) => {
        if(error) {
            handleError(error)
        }
        console.log(result.insertedCount)
        console.log(`Updated ${result.modifiedCount} record(s)`)
        callback(result)
    })
}

const remove = (db, callback) => {
    var collection = db.collection('test-db')
    const name = 'Bob'
    collection.deleteMany({name : name}, (error, result) => {
        if(error) {
            handleError(error)
        }
        console.log(result.insertedCount)
        console.log(`Removed ${result.deletedCount} record(s)`)
        callback(result)
    })
}

const find = (db, callback) => {
    const collection = db.collection('test-db')
    collection.find({}).toArray((error, result) => {
        if(error) handleError(error)
        console.log(result.insertedCount)
        console.log(`Found ${result.length} record(s)`)
        console.log(result)
        callback(result)
    })
}

