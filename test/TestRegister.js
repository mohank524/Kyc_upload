var Register = artifacts.require('Register.sol');
var Prove = artifacts.require('Prove.sol');

contract('Register contract test suit', function (accounts) {

    it('Test constructor argument', function () {
        return Register.deployed().then((instance) => {
            return instance.owner.call({ from: accounts[0] });
        }).then((owner) => {
            const expected = accounts[0];
            const actual = owner;
            assert.equal(expected, actual, "owner should be set to the account that deployed contract");
        })
    });

})