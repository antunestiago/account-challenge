const account = require('../account/index');
const transaction = require('../transaction/index');
const writeOutput = require('../writer-output')

let transactions_history = [];

exports.history = (payload) => {

    if(!account.clientExists(payload['document'])) {
        writeOutput.writeOutputPayload({"type": "transaction_history", "status": "failure", "violation": "account_not_initialized"});
        return new Error("Transaction Failed.");;
    }   

    client_history = transactions_history.filter(th => th['account'] === payload.document);

    client_history.map(ch => {
        const {account, ...restProperties} = ch; //remove account key
        return restProperties;
    });
    
    writeOutput.writeOutputPayload({"type": "transaction_history", "status": "success", "result": client_history});
    
    return {"status": "Ok"};
}  

exports.addTransactionHistory = (transaction) => {
    transactions_history.push(transaction);
}