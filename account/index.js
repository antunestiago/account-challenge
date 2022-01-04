const writeOutput = require('../writeOutput')

const accounts = [];

exports.initializeAccount = (payload) => {
    console.log(payload);

    if(payloadValidation(payload)) {
        writeOutput.writeOutputPayload({"type": "initialize_account", "status": "failure", "violation": "invalid_data" })
        return false;
    }

    if(!isNewClient(payload)) {
        writeOutput.writeOutputPayload({"type": "initialize_account", "status": "failure", "violation": "account_already_initialized"});
        return false;
    }

    accounts.push(payload);

    writeOutput.writeOutputPayload({ 
        "type": "initialize_account", 
        "status": "status_do_processamento", 
        "result": payload
    })

    return true;
}  

function payloadValidation(payload) {
    return Boolean(!payload.name || !payload.document || !payload.available_limit);
}

function isNewClient(payload) {
    return !accounts.some(account => account.document === payload.document);
}

exports.getAccounts = () => {
    return accounts;
}
 