const writeOutput = require('../writer-output/index')

let accounts = [];

exports.initializeAccount = (payload) => {
    if(payloadValidation(payload)) {
        writeOutput.writeOutputPayload({"type": "initialize_account", "status": "failure", "violation": "invalid_data" })
        return false;
    }

    if(clientExists(payload.document)) {
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
    return Boolean(!payload.name || !payload.document || !payload['available-limit']);
}

const clientExists = exports.clientExists = (document) => {
    return accounts.some(account => account.document === document);
}

exports.getAccount = (document) => {
    return accounts.find(account => account.document === document);
}

exports.transferFunds = (senderDocument, receiverDocument, value) => {
    let senderAccount = accounts.find( a => senderDocument === a.document);
    let receiverAccount = accounts.find( a => receiverDocument === a.document);


    let newSenderAccount = Object.assign(senderAccount);
    let newReceiverAccount = Object.assign(receiverAccount);

    
    newSenderAccount['available-limit'] = newSenderAccount['available-limit'] - value;
    newReceiverAccount['available-limit'] = newReceiverAccount['available-limit'] + value;
    
    const oldAccounts = [...accounts];

    try {
        accounts = accounts.filter( a => ![senderDocument, receiverDocument].includes(a.document));
        accounts = [...accounts,...[newSenderAccount, newReceiverAccount]];
    } catch (error) {
        accounts = [...oldAccounts];
        console.log(accounts);
        return new Error("Transaction failed");
    }

    return 
}

 