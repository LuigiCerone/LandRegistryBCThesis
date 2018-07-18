'use strict';
import web3 from "./web3.wrapper";
import Unity from './Unity';
import UnityAbi from "BuildContracts/Unity";

// let contractAddress = Object.values(UnityAbi.networks).pop().address;
let UnityContract = new web3.eth.Contract(UnityAbi.abi);


let addresses;
web3.eth.getAccounts().then((accounts) => {
    web3.eth.defaultAccount = accounts[0];
    console.log("Default account is: " + web3.eth.defaultAccount);
    addresses = accounts;
}).catch((err) => console.log(err));

const unityController = {
    // district, document, landParcel, subaltern, ownerAddress.
    async insertUnity(district, document, landParcel, subaltern, ownerAddress) {

        // First we need to create a new unity by using the data stored in req.body.
        let newUnity = new Unity(district, document, landParcel, subaltern, ownerAddress);
        // debugger;
        // Now I need to insert newUnity into the contract.
        try {
            // let [insert, event] = await unityDAO.insertUnity(newUnity);
            let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
            console.log("Nonce value is: " + nonce);


            UnityContract.deploy({
                data: UnityAbi.bytecode,
                // (district, document, landParcel, subaltern, ownerAddress)
                arguments: [web3.utils.asciiToHex(newUnity._district), newUnity._document,
                    newUnity._landParcel, newUnity._subaltern, newUnity._ownerAddress]
            })
                .send({
                    from: web3.eth.defaultAccount,
                    nonce: web3.utils.toHex(++nonce),
                    // estimated gas 804653
                    gas: web3.utils.toHex(1000000)
                }).then(function (newContractInstance) {
                console.log(newContractInstance.options.address) // instance with the new contract address
            });
        } catch (error) {
            console.log("" + error);
        }
    },

    async getHistory(landId) {
        try {
            let result = await this.getAllHistoryEntries(landId);
            console.log(result);
        } catch (error) {
            console.log("" + error);
        }
    },

    async getAllHistoryEntries(landId) {
        let n = await UnityContract.methods.getNoOfEntries(landId).call();
        let promises = [];
        for (let i = 0; i < n; i++) {
            promises.push(UnityContract.methods.getHistory(landId, i).call());
        }
        return Promise.all(promises);
    },

    async getListOfLands(searchAddress) {
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
        try {
            await UnityContract.methods.transferLand(buyerAddress, landParcel).send({
                from: ownerAddress,
                gas: 300000
            });
        } catch (error) {
            console.log("" + error);
        }
    }
};
export default unityController;