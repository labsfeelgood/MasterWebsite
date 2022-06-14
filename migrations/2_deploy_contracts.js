var SimpleStorage = artifacts.require("./PharmaSupplyContract.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
