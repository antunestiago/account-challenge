const account = require('../account/index');
const transaction = require('../transaction/index');

let transactions_history = [];

exports.history = (payload) => {

    if(!account.clientExists(payload['document'])) {
        writeOutput.writeOutputPayload({"type": "transaction", "status": "failure", "violation": "account_not_initialized"});
        return new Error("Transaction Failed.");;
    }   

    console.log(transactions_history.filter(th => th['account'] === payload.document));

    //writeOutput.writeOutputPayload({"type": "transaction", "status": "success", "result": result});
    return {"status": "Ok"};
}  

exports.addTransactionHistory = (transaction) => {
    transactions_history.push(transaction);
}