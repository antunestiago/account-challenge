const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const formidable = require('formidable');

const eventHandler = require('./event-handler/index');
const account = require('./account/index');

const app = express();

app.use(bodyParser.json());  

app.post('/eventsupload', (req, res) => {
    let events = []
    var form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) throw err;

        fs.readFile(files.upload.filepath, (err, data) => {
            if (err) throw err;
            events = JSON.parse(data);

            eventHandler.proccessEvents(events);

            res.send({status: "OK"});
        });        
    });

});

app.get('/accounts', (req, res) => {
    res.send(account.getAccounts())
});

app.listen(4005, () => {
    console.log("Listening on 4005");
});
