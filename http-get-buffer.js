const http = require('http')

const url = 'http://nodeprogram.com'

http.get(url, (response) => {
    let buffer = ''
    response.on('data', (chunk) => {
        buffer += chunk
    })
    response.on('end', () => {
        console.log(buffer.toString('utf8'))
    })
}).on('error', (error) => {
    console.error(`Got error : ${error.message}`)
})
