const converter = require('csvtojson')
const fs = require('fs')
const toConvert = 'customer-data.csv'

let jsonArray = []

converter().fromFile(toConvert).then((jsonObj, error) => {
    if(error){
        console.error(`Error : ${error.message}`)
        return process.exit(1)
    }
    jsonArray.push(jsonObj)
    console.log(jsonArray)
    fs.writeFile('customer-data.json', JSON.stringify(jsonArray, null, 2), (error) => {
        if(error){
            console.error(`Error: ${erorr.message}`)
            return process.exit(1)
        }
        console.log('Conversion successful')
        process.exit(0)
    })
})

