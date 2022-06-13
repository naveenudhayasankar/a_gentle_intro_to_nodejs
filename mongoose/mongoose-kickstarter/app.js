// Importing mongoose module
const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017'
mongoose.connect(url)

// Specifying a model 
let Book = mongoose.model('Book', {name : String})

// Instance of the model
let book1 = new Book({name :'First Book'})

// Persistence into DB 
book1.save((error, result) => {
    if(error) console.error(error.message)
    console.log({'Saved' : book1})
    process.exit(0)
})

