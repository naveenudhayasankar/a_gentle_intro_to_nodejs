// Import http module
const http = require('http')

// Define port in which the server will run
const port = 8000 

// Create server using request, response pair, define headers, output and status
http.createServer((req, res) => {

    console.log(req.headers)
    console.log(req.url)
    console.log(req.statusCode)
    console.log(req.statusMessage)

    if(req.method == 'POST'){
        let buffer = ''
        req.on('data', (chunk) => {
            buffer += chunk
        })

        req.on('end', () => {
            res.statusCode = 200
            res.write('Beginning of response\n')
            res.end('Accepted request body \n')
            console.log(`BODY : ${buffer}, STATUS : ${res.statusCode}`)

        })
    }
    else{
        res.writeHead(200, {'Content-Type' : 'text/plain'})
        res.write('Beginning of response\n')
        res.end('You have been served \n')
    }
}).listen(port)

console.log(`Server is running at http://localhost:${port}/`)