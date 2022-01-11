const writeOutput = require('../writer-output')
const account = require('../account/index');
const { read } = require('fs');
const transactions = [];

exports.process = (payload) => {

    if(!isValidAccounts(payload['sender-document'], payload['receiver-document'])) {
        writeOutput.writeOutputPayload({"type": "transaction", "status": "failure", "violation": "account_not_initialized"});
        return new Error("Transaction Failed.");;
    }

    senderAccount = account.getAccount(payload['sender-document']);

    if(payload.value > senderAccount.available_limit) {
        writeOutput.writeOutputPayload({"type": "transaction", "status": "failure", "violation": "insufficient_limit"});
        return new Error("Transaction Failed.");
    }

    if(isNewTransactionIsAfterTwoMin(payload)) {
        writeOutput.writeOutputPayload({"type": "transaction", "status": "failure", "violation": "double_transaction"});
        return new Error("Transaction Failed.");
    }

    if(operateTransaction(senderDocument, receiverDocument, value)) {
        result = {
            "available-limit": senderAccount.available_limit - payload.value, 
            "receiver-document": payload['receiver-document'], 
            "sender-document": payload['sender-document'],
            "datetime": payload['datetime']
        };

        writeOutput.writeOutputPayload({"type": "transaction", "status": "success", "result": result});

        transactions.push(result);
    }

    return {"status": "Ok"};
}  

function isNewTransactionIsAfterTwoMin(payload) {
    const TWO_MINUTES_IN_SECONDS = 120;
    const relatedTransactions = transactions.filter(t => {
        [payload['sender-document'], payload['receiver-document']].includes(t.document);
    });

    if(relatedTransactions.length === 0) {
        return true;
    }

    if(relatedTransactions.length > 1) {
        relatedTransactions.sort((a,b) => new Date(a.datetime) - new Date(b.datetime));
    }

    const diff = (new Date(payload.datetime) - new Date(relatedTransactions[0].datetime));
    
    return diff/1000 > TWO_MINUTES_IN_SECONDS; 
}

function isValidAccounts(senderDocument, receiverDocument) {
    return account.clientExists(senderDocument) && account.clientExists(receiverDocument);
}

function operateTransaction(senderDocument, receiverDocument, value) {
    try {
        account.transferFunds(senderDocument, receiverDocument, value);    
    } catch (error) {
        console.log(error);
        return false;
    }
    
    return true;
}