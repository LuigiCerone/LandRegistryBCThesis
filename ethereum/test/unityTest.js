const Unity = artifacts.require("Unity");

// SINTASSI truffle-contract!!

contract('Unity contract test', async (accounts) => {
    it("Should insert a land in the first account", async () => {
        let instance = await Unity.deployed();
        console.log("Contract address is: " + instance.address);
        console.log("First account address is: " + accounts[0]);

        // let nonce = await web3.eth.getTransactionCount(accounts[0]);

        // Insert a fake land for accounts[0].
        let tx = await instance.addLand("0x4151", 12, 123456789, 32, accounts[0]);

        // Check if account[0] has only 1 land related.
        let numberOfLands = await instance.getNoOfLands(accounts[0]);
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
        let instance = await Unity.deployed();

        const NUM_TRANSFERS = 100;

        for (let i = 0; i < NUM_TRANSFERS; i++) {
            let landParcelRandom = Math.floor(Math.random() * 10000000) + 1;
            let insertionGas = await instance.addLand("0x4151", 12, landParcelRandom, 32, accounts[0]);

            let transferGas = await instance.transferLand(accounts[1], landParcelRandom);

            // console.log("Insertion gas cost: " + JSON.stringify(insertionGas), ", transfer gas cost: " + JSON.stringify(transferGas));
            console.log("Insertion gas cost: " + insertionGas.receipt.gasUsed, ", transfer gas cost: " + transferGas.receipt.gasUsed);
        }
    });
});