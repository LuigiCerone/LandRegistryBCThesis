'use strict';
import web3 from "./web3.wrapper";
import Unity from './Unity';
import UnityAbi from "BuildContracts/Unity";
import LoggerAbi from "BuildContracts/Logger";

let loggerContractAddress = Object.values(LoggerAbi.networks).pop().address;
// console.log(loggerContractAddress);

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
            let newContractInstance = await UnityContract.deploy({
                data: UnityAbi.bytecode,
                // (district, document, landParcel, subaltern, ownerAddress)
                arguments: [loggerContractAddress, web3.utils.asciiToHex(newUnity._district), newUnity._document,
                    newUnity._landParcel, newUnity._subaltern, newUnity._ownerAddress]
            })
                .send({
                    from: web3.eth.defaultAccount,
                    nonce: web3.utils.toHex(nonce),
                    // estimated gas 804653
                    gas: web3.utils.toHex(1200000)
                });
            console.log("New contract address is: " + newContractInstance.options.address);


            // let result = await newContractInstance.methods.insertLand(web3.utils.asciiToHex(newUnity._district), newUnity._document,
            //     newUnity._landParcel, newUnity._subaltern, newUnity._ownerAddress).send({
            //     from: web3.eth.defaultAccount,
            //     nonce: web3.utils.toHex(++nonce),
            //     gas: web3.utils.toHex(300000)
            // });
            // console.log(result);

        } catch (error) {
            console.error("" + error);
        }
    },

    async getHistory(landId) {

        // First we need to query the server in order to find the smart contract address.
        try {
            let response = await fetch('/rest/v1/getHistory?id=' + landId);
            let result = await response.json();

            // let contractAddress = result[0].contract.contractAddress;
            // console.log(contractAddress);

            // let result = await this.getAllHistoryEntries(landId);
            console.log(result);
        } catch (error) {
            console.error("" + error);
        }
    },

    async getListOfLands(searchAddress) {
        try {
            let response = await fetch('/rest/v1/getLandsForAddress?addr=' + searchAddress);
            let result = await response.json();
            console.log(result);
        } catch (error) {
            console.log("" + error);
        }
    },

    async transfer(landId, ownerAddress, buyerAddress) {
        try {
            // (1) get contract address by searching with landId.
            // (2) check owner address.
            // (3) load smart contract somehow.
            // (4) change owner address in smart contract.
            // (5) store the history in the db.

            let response = await fetch('/rest/v1/getLandById?id=' + landId + "&addr=" + ownerAddress);
            let contractStored = await response.json();

            console.log(contractStored);
            let contractAddress = contractStored[0].contract.contractAddress;

            let UnityContract = new web3.eth.Contract(UnityAbi.abi, contractAddress);

            let result = await UnityContract.methods.transferLand(buyerAddress, contractStored[0].contract.land.landParcel).send({
                from: ownerAddress,
                gas: 300000
            });
            console.log(result);
        } catch (error) {
            console.log("" + error);
        }
    }
};
export default unityController;