import UnityAbi from "BuildContracts/Unity";
import web3 from "web3.wrapper";

import $ from "jquery";

UnityContract = new web3.eth.Contract(UnityAbi.abi, Object.values(UnityAbi.networks).pop().address);

// Setup ganache-cli addresses.
var addresses;
web3.eth.getAccounts().then((accounts) => {
    web3.eth.defaultAccount = accounts[0];
    addresses = accounts;
}).catch((err) => console.log(err));


module.exports = {

    init() {

    },

    insertUnity(newUnity) {
        UnityContract.methods.addLand(newUnity._landParcel, newUnity._ownerAddress).send({
            from: web3.eth.defaultAccount,
            nonce: nonce,
            gas: 300000
        }).then(console.log);
    }
};