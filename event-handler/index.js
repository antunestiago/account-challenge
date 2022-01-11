const account = require('../account/index');
const transaction = require('../transaction/index');

let allEvents = []; // will work as event buffer

const handleEvent = (type, payload) => {

    if (type === 'initialize_account') {
        account.initializeAccount(payload);
    }

    if (type === 'transaction') {
        transaction.process(payload)        
    }
};

exports.proccessEvents = (events) => {
    allEvents = allEvents.concat(events);

    allEventsSize = allEvents.length

    for (let i = 0; i < allEventsSize; i++) {
        const event = allEvents.shift();
        
        handleEvent(event.type, event.payload);
    }
}; 