const Unity = artifacts.require("Unity");
// const Web3 = require("web3");
// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


contract('Unity contract test', async (accounts) => {
    it("Should insert a land in the first account", async () => {
        let instance = await Unity.deployed();
        console.log("Contract address is: " + instance.address);
        console.log("First account address is: " + accounts[0]);
        console.log("Web3 version:" + web3.version);

        // let nonce = await web3.eth.getTransactionCount(accounts[0]);

        let tx = await instance.addLand(123456789, accounts[0]);

        let numberOfLands = await instance.getNoOfLands(accounts[0]);
        assert.equal(1, numberOfLands);
    });
});