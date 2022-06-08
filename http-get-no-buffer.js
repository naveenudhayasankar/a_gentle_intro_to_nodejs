const http = require('http')

const url = 'http://nodeprogram.com'

http.get(url, (response) => {
    let count = 0
    response.on('data', (chunk) => {
        count++
        console.log(chunk.toString('utf8'))
    })
    response.on('end', () => {
        console.log(`Response has ended with ${count} chunk(s)`)
    })
}).on('error', (error) => {
    console.error(`Got error : ${error.message}`)
})
