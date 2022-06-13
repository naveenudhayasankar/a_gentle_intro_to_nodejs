// Required modules
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017'
const customers = require('./customer-data.json')
const customerAddresses = require('./customer-address-data.json')
const async = require('async')

// Empty tasks array 
let tasks = []

// Limit - obtained from cmd line argument
const limit = parseInt(process.argv[2], 10) || 1000 

// DB Connection
MongoClient.connect(url, (error, dbClient) => {
    if(error) {
        console.log(error.message)
        return process.exit(-1)
    }
    const db = dbClient.db('customer-addresses')
    // For each customer, append the address 
    customers.forEach((customer, index) => {
        customers[index] = Object.assign(customer, customerAddresses[index])
        
        // Processing the records in batches
        if(index % limit == 0) {
            var start = index
            var end = (start + limit > customers.length) ? customers.length - 1 : start + limit
            tasks.push((done) => {
                console.log(`Processing ${start} to ${end} out of ${customers.length} customers`)
                db.collection('customers').insertMany(customers.slice(start, end), (error, results) => {
                    done(error, results)
                })
            })
        }
    })
    console.log(`Launching ${tasks.length} tasks in parallel`)
    const startTime = Date.now()
    // Async launches parallel tasks and executes them asynchronously
    async.parallel(tasks, (error, results) => {
        if(error) console.log(error.message)
        const endTime = Date.now()
        console.log(`Execution time is ${endTime - startTime}`)
        dbClient.close()
    })
})
