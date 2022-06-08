// Necessary imports
const http = require('http')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v1')

// Function to download data from the URL provided as a CLI argument, default URL is http://nodeprogram.com
const download = (url = 'http://nodeprogram.com') => {
    console.log('Downloading ', url)
    // function sending get request to the URL specified
    const fetchPage = (urlF, callback) => {
        // Getting and processing response from the URL
        http.get(urlF, (resp) => {
            let buffer = ''
            resp.on('data', (chunk) => {
                buffer += chunk
            })
            // Finishing the response
            resp.on('end', () => {
                // If callback is not called, timeout will occur
                callback(null, buffer)
            })
        }).on('error', (error) => {
            console.error(`Error : ${error.message}`)
            // Passing the error to the callback
            callback(error)
        })
    }
    
    // Specify unique name for the folder 
    const foldername = uuid()
    fs.mkdirSync(foldername)
    // Call fetchpage and define the callback 
    fetchPage(url, (error, data) => {
        if(error) return console.log(error)
        // Write url and data to the files 
        fs.writeFileSync(path.join(__dirname, foldername, 'url.txt'), url)
        fs.writeFileSync(path.join(__dirname, foldername, 'file.html'), data)
        console.log('Downloading completed at ', foldername)
    })
}

// Getting url from CLI
download(process.argv[2])