var Unity = artifacts.require("./Unity.sol");

module.exports = function (deployer) {
    deployer.deploy(Unity);

    let unity = Unity.deployed()
        .then(i => i.owner()
            .then(address => console.log(`The address of the contract's owner is ${address}`))
        ).catch(console.log);
};