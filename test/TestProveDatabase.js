var ProveDatabase = artifacts.require('ProveDatabase.sol');
var Web3 = require('web3');

contract('ProveDatabase contract test suit', function (accounts) {

    var web3 = new Web3();

    it('Test add allowed contracts', function () {
        const contractAddr = "0xaca0000620f00001e7200003b3a00004e140000d";
        const owner = accounts[0];
        let contractInstance = null;
        return ProveDatabase.deployed().then((instance) => {
            contractInstance = instance;
            instance.addAllowedContractOrOwner(contractAddr, { from: owner });
        }).then(() => {
            return contractInstance.isAllowedContractOrOwner.call(contractAddr, { from: owner });
        }).then((status) => {
            const expected = true;
            const actual = status;
            assert.equal(expected, actual, "Should return true if successfully added to the allowed list");
        })
    });

    it('Test add allowed owner', function () {
        const owner = accounts[0];
        let contractInstance = null;
        return ProveDatabase.deployed().then((instance) => {
            contractInstance = instance;
            instance.addAllowedContractOrOwner(owner, { from: owner });
        }).then(() => {
            return contractInstance.isAllowedContractOrOwner.call(owner, { from: owner });
        }).then((status) => {
            const expected = true;
            const actual = status;
            assert.equal(expected, actual, "Should return true if succesfully added to the allowed list");
        })
    });

    // this test ensures that unauthorized users  are not able to add owners.
    it('Test add allowed contract by unauthorized owner', function () {
        const contractAddr = "0xaca0000620f00001e7200003b3a00004e141234d";
        const owner = accounts[0];
        return ProveDatabase.deployed().then((instance) => {
            return instance.isAllowedContractOrOwner.call(contractAddr, { from: owner });
        }).then((status) => {
            const expected = false;
            const actual = status;
            assert.equal(expected, actual, "Should return false for a unauthrized contract");
        })
    });

})