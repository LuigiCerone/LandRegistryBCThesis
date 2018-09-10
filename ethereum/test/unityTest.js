const Unity = artifacts.require("Unity");
const Logger = artifacts.require("Logger");

const fetch = require('node-fetch');

// SINTASSI truffle-contract!!

contract('Unity contract test', async (accounts) => {
    it("Should insert a land in the first account", async () => {
        console.log("First account address is: " + accounts[0]);

        let logger = await Logger.deployed();
        console.log(`Logger address is ${logger.address}`);

        let instance = await Unity.new(logger.address, "0x4151", 12, 123456789, 32, accounts[0]);

        let receipt = await web3.eth.getTransactionReceipt(instance.transactionHash);

        console.log(`Gas used to deploy is: ${receipt.gasUsed}`);

        // Check if account[0] has only 1 land related.
        let response = await fetch('http://localhost:3000/rest/v1/getLandsForAddress?addr=' + accounts[0]);
        let result = await response.json();

        let numberOfLands = result.length;
        assert.equal(1, numberOfLands);
    });


    // it("Should estimate gas usage for fake insertions", async () => {
    //     let instance = await Unity.deployed();
    //
    //     const NUM_INSERTIONS = 10;
    //
    //     for (let i = 0; i < NUM_INSERTIONS; i++) {
    //         let res = await instance.addLand.estimateGas(Math.floor(Math.random() * 10000000) + 1, accounts[0]);
    //         console.log(res);
    //     }
    // });

    it("Should estimate gas usage for fake transfers", async () => {
        const NUM_TRANSFERS = 100;

        let logger = await Logger.deployed();
        console.log(`Logger address is ${logger.address}`);

        for (let i = 0; i < NUM_TRANSFERS; i++) {
            let landParcelRandom = Math.floor(Math.random() * 10000000) + 1;
            let instance = await Unity.new(logger.address, "0x4151", 12, landParcelRandom, 32, accounts[0]);

            let receipt = await web3.eth.getTransactionReceipt(instance.transactionHash);
            console.log(`Gas used to deploy is: ${receipt.gasUsed}`);
        }
    });
});