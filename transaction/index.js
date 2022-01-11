const writeOutput = require('../writer-output')
const account = require('../account/index');
const transaction_history = require('../transaction-history/index');
const { read } = require('fs');
const transactions = [];

exports.process = (payload) => {

    if(!isValidAccounts(payload['sender-document'], payload['receiver-document'])) {
        writeOutput.writeOutputPayload({"type": "transaction", "status": "failure", "violation": "account_not_initialized"});
        return new Error("Transaction Failed.");;
    }

    senderAccount = account.getAccount(payload['sender-document']);

    if(payload.value > senderAccount['available-limit']) {
        writeOutput.writeOutputPayload({"type": "transaction", "status": "failure", "violation": "insufficient_limit"});
        return new Error("Transaction Failed.");
    }

    if(!isNewTransactionIsAfterTwoMin(payload)) {
        writeOutput.writeOutputPayload({"type": "transaction", "status": "failure", "violation": "double_transaction"});
        return new Error("Transaction Failed.");
    }

    if(operateTransaction(payload['sender-document'], payload['receiver-document'], payload.value)) {
        result = {
            "available-limit": senderAccount['available-limit'], 
            "receiver-document": payload['receiver-document'], 
            "sender-document": payload['sender-document'],
            "datetime": payload['datetime']
        };

        writeOutput.writeOutputPayload({"type": "transaction", "status": "success", "result": result});

        creditTransaction ={...result}; 
        debitTransaction = {...result}; 

        creditTransaction['value'] = payload.value;
        creditTransaction['account'] = payload['receiver-document'];

        debitTransaction['value'] = -payload.value;
        debitTransaction['account'] = payload['sender-document']; 
        transaction_history.addTransactionHistory(creditTransaction);
        transaction_history.addTransactionHistory(debitTransaction);

        return {"status": "Ok"};
    }

    return {"status": "Fail"};
}  

function isNewTransactionIsAfterTwoMin(payload) {
    const TWO_MINUTES_IN_SECONDS = 120;

    let relatedTransactions = transactions.filter(t => {
        return payload['sender-document'] === t['sender-document'] && payload['receiver-document'] === t['receiver-document'];
    });

    if(relatedTransactions.length === 0) {
        return true;
    }


    if(relatedTransactions.length > 1) {
        relatedTransactions.sort((a,b) => new Date(a.datetime) - new Date(b.datetime));
    }

    let diff = (new Date(payload.datetime) - new Date(relatedTransactions[0].datetime));
    
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

exports.getTransactionsByDocument = (document) => {
    return transactions.filter(t => [t['sender-document'],t['receiver-document']].includes(document));
}