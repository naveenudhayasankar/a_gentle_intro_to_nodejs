const EventEmitter = require('events')

class Job extends EventEmitter {
    // Constructor ES6 convention
    constructor(ops){
        super(ops)
        // Event observer to listen for the start event
        this.on('start', ()=> {
            // Calling the event emitter
            this.process()
        })
    }

    // Event emitter 
    process(){
        setTimeout(()=>{
            this.emit('done', {completedOn : new Date()})
        },700)
    }
}

// Export the entire class to be used in weekly.js
module.exports = Job