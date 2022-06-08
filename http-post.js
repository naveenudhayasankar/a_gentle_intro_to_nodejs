// Import the http module
const http = require('http')

// Data to be sent in the post request 
const postData = JSON.stringify({foo : 'bar'})

// Setting options for the post request, sending data to mockbin.com through a post request via port 80
const options = {
    hostname: 'mockbin.com',
    port: 80,
    path: '/request?foo=bar&foo=baz',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

// Event observer for the request, collect response from mockbin and process it
const req = http.request(options, (res) => {
    let buffer = ''
    res.on('data', (chunk) => {
        buffer+=chunk
    })
    res.on('end', () => {
        try{
            const json = JSON.parse(buffer)
            console.log(json)
        }
        catch(e){
            console.error(e.message)
        }
        console.log('End of response')
    })
    res.on('error', (error) => {
        console.error(error.message)
    })
})

// Send the data through post method
req.write(postData)

// End the requestclear
req.end()
  