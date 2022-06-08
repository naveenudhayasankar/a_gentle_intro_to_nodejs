const http = require('https')

const url = 'https://gist.githubusercontent.com/azat-co/a3b93807d89fd5f98ba7829f0557e266/raw/43adc16c256ec52264c2d0bc0251369faf02a3e2/gistfile1.txt'

http.get(url, (response) => {
    let buffer = ''
    response.on('data', (chunk) => {
        buffer += chunk
    })
    response.on('end', () => {
        try{
            const json = JSON.parse(buffer)
            console.log(json)
        }
        catch(e){
            console.error(e.message)
        }
    })
    response.on('error', (error) => {
        console.error(error.message)
    })
}).on('error', (error) => {
    console.error(`Got error : ${error.message}`)
})
