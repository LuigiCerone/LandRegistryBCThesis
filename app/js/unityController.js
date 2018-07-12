'use strict';
import web3 from "./web3.wrapper";
import Unity from './Unity';
import UnityAbi from "BuildContracts/Unity";

let contractAddress = Object.values(UnityAbi.networks).pop().address
let UnityContract = new web3.eth.Contract(UnityAbi.abi, contractAddress);

let addresses;
web3.eth.getAccounts().then((accounts) => {
    web3.eth.defaultAccount = accounts[0];
    console.log(web3.eth.defaultAccount);
    addresses = accounts;
}).catch((err) => console.log(err));

const unityController = {
    async insertUnity(landParcel, ownerAddress) {

        // First we need to create a new unity by using the data stored in req.body.
        let newUnity = new Unity(landParcel, ownerAddress);
        // debugger;
        // Now I need to insert newUnity into the contract.
        try {
            // let [insert, event] = await unityDAO.insertUnity(newUnity);
            let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
            console.log("Nonce value is: " + nonce);

            let result = await UnityContract.methods.addLand(newUnity._landParcel, newUnity._ownerAddress).send({
                from: web3.eth.defaultAccount,
                nonce: web3.utils.toHex(++nonce),
                gas: web3.utils.toHex(300000)
            });
            console.log(result);

            // let encodedMethod = UnityContract.methods.addLand(newUnity._landParcel, newUnity._ownerAddress).encodeABI();
            // console.log("EncodedMethod is: " + encodedMethod);
            //
            //
            // console.log("Default account is:" + web3.eth.defaultAccount);
            // let val = await web3.eth.getBalance(web3.eth.defaultAccount);
            // console.log("Fund is:" + val);
            // let transactionToSign = {
            //     gas: web3.utils.toHex(32000),
            //     gasPrice: '0x4a817c800',
            //     to: contractAddress,
            //     data: encodedMethod,
            //     nonce: web3.utils.toHex(++nonce)
            // };
            //
            // let signedTransaction = await  web3.eth.accounts.signTransaction(transactionToSign, web3.eth.defaultAccount);
            // let result = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
            // console.log(result);

            // If here then correctly inserted into the contract.
            // console.log(insert);
            // TODO Update UI.
        } catch (error) {
            console.log("" + error);
        }
    },

    async getHistory(landId) {
        try {
            let res = await UnityContract.methods.getHistoryForLand(landId).call();
            console.log(res);
        } catch (error) {
            console.log("" + error);
        }
    },

    async getList(searchAddress) {
        try {
            let result = await this.getAllLands(searchAddress);
            console.log(result);
        } catch (error) {
            console.log("" + error);
        }
    },

    async getAllLands(searchAddress) {
        let n = await UnityContract.methods.getNoOfLands(searchAddress).call();
        let promises = [];
        for (let i = 0; i < n; i++) {
            promises.push(UnityContract.methods.getLand(searchAddress, i).call());
        }
        return Promise.all(promises);
    },

    async transfer(landParcel, ownerAddress, buyerAddress) {
        let unity = new Unity(landParcel, ownerAddress);

        try {
            await UnityContract.methods.transferLand(buyerAddress, unity._landParcel).send({
                from: unity._ownerAddress,
                gas: 300000
            });
        } catch (error) {
            console.log("" + error);
        }
    }
};
export default unityController;