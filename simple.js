const EventEmitter = require('events') // import events core module

class Job extends EventEmitter {} // set up a class for the event emitter

job = new Job() // creating an object for the class

// define what to do when the event is emitted
job.on('done', function(timeDone){
    console.log('Job was done at', timeDone)
})

// trigger for the event, case sensitive
job.emit('done', new Date())

// remove all listeners of an event emitter object
job.removeAllListeners()