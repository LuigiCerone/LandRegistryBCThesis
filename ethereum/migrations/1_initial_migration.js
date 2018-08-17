// artifcats is an abstraction provided by Truffle that allows us to easily work with smart contracts.
var Migrations = artifacts.require("./Migrations.sol");
var Logger = artifacts.require("./Logger.sol");

module.exports = function (deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(Logger);
};
