// Import the Job class from job.js
var Job = require('./job.js')

// Instantiate an object for the Job class
var job = new Job()

// Event observer to listen for the done event
job.on('done', function(details){
    console.log('Weekly job completed on', details.completedOn)
})

// Event emitter to start the process - equivalent to calling job.process() from job.js
job.emit('start')