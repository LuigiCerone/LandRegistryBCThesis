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

            // UnityContract.methods.addLand(newUnity._landParcel, newUnity._ownerAddress).send({
            //     from: web3.eth.defaultAccount,
            //     nonce: nonce,
            //     gas: 300000
            // }).then(console.log);
            let encodedMethod = UnityContract.methods.addLand(newUnity._landParcel, newUnity._ownerAddress).encodeABI();
            console.log("EncodedMethod is: " + encodedMethod);


            // let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
            // console.log("Nonce value is: " + nonce);

            let transactionToSign = {
                gasLimit: web3.utils.toHex(6700000),
                from: "0x74CceB453Ce7d0239f0d012d6Da2B9E4C07E9979",
                to: contractAddress,
                data: encodedMethod,
                // nonce: web3.utils.toHex(++nonce)
            };

            let signedTransaction = await  web3.eth.accounts.signTransaction(transactionToSign, web3.eth.defaultAccount);

            let result = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
            console.log(result);

            // If here then corretly inserted into the contract.
            // console.log(insert);
            // TODO Update UI.
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    // async getList(req, res) {
    //     logger.info("Just received a getList request.");
    //     let address = req.body.address;
    //
    //     let result = null;
    //     try {
    //         result = await unityDAO.getList(address);
    //         res.json(result);
    //     } catch (error) {
    //         logger.error("" + error);
    //         res.status(500).send();
    //     }
    // },
    //
    // getAddresses(req, res) {
    //     logger.info("Just received a getAddresses request.");
    //
    //     try {
    //         res.json(unityDAO.getAddresses());
    //     } catch (error) {
    //         logger.error("" + error);
    //         res.status(500).send();
    //     }
    // },
    //
    // getAddress(req, res) {
    //     logger.info(`Just received a getAddress request with id: ${req.params.id}.`);
    //
    //     try {
    //         res.json(unityDAO.getAddress(req.params.id));
    //     } catch (error) {
    //         logger.error("" + error);
    //         res.status(500).send();
    //     }
    // },
    //
    // async transfer(req, res) {
    //     logger.info('Just received a transfer request.');
    //
    //     let unity = new Unity(req.body.landParcel, req.body.ownerAddress);
    //
    //     try {
    //         res.json(await unityDAO.transfer(req.body.buyerAddress, unity));
    //     } catch (error) {
    //         logger.error("" + error);
    //         res.status(500).send();
    //     }
    // },
    //
    // async getHistory(req, res) {
    //     logger.info(`Just received a getHistory request for landId: ${req.params.landId}`);
    //
    //     try {
    //         res.json(await unityDAO.getHistory(req.params.landId));
    //     } catch (error) {
    //         logger.error("" + error);
    //         res.status(500).send();
    //     }
    // }
};
export default unityController;