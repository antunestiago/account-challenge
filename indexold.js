const fs = require("fs");
const arguments = process.argv ;
const eventsHandler = require('./event-handler/index')

const readJSONFile = () => {
    fs.readFile(arguments[2], (err, eventsPayload) => {
        if (err) throw err;
        const events = JSON.parse(eventsPayload);
    });

} 


() => {
    return readJSONFile();
};
