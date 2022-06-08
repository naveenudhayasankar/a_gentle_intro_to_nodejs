// Import http module
const http = require('http')

// Define port in which the server will run
const port = 8000 

// Create server using request, response pair, define headers, output and status
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/plain'})
    res.end('You have been served \n')
}).listen(port)

console.log(`Server is running at http://localhost:${port}/`)