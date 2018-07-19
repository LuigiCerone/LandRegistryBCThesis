const web3 = require('../../server/web3');
const logger_abi = require('../../ethereum/build/contracts/Logger');
const logger = require('../../server/logger');


var LoggerContract = new web3.eth.Contract(logger_abi.abi);

// We need to set the contract's address and the default from (governament address i.e. first address).
LoggerContract.options.address = Object.values(logger_abi.networks).pop().address;
console.log(LoggerContract.options.address);

module.exports = {
    getContractInfo() {
        return LoggerContract;
    }
};