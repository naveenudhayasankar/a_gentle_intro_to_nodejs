const EventEmitter = require('events')

class Job extends EventEmitter {}

job = new Job()

job.on('knock', function(){
    console.log('Knocked once but executed twice')
})

job.on('knock', function(){
    console.log('Order of declaring the observers matters')
})

job.once('knock knock', function(){
    console.log('Knocked twice but executed only once')
})

job.emit('knock')
job.emit('knock')
job.emit('knock knock')
job.emit('knock knock')

job.removeAllListeners()