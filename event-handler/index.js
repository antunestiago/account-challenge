const account = require('../account/index');

let allEvents = []; // will work as event buffer

const handleEvent = (type, payload) => {

    if (type === 'initialize_account') {
        account.initializeAccount(payload);
    }
};

exports.proccessEvents = (events) => {
    allEvents = allEvents.concat(events);

    allEvents.forEach(e => {
        handleEvent(e.type, e.payload);
    });
}; 