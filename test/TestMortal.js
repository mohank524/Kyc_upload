var Mortal = artifacts.require('Mortal.sol');

contract('Tests for the Mortal Contract', function (accounts) {

    it('Test contract owner constructor functionality', function () {
        return Mortal.deployed().then(function (instance) {
            return instance.owner.call({ from: accounts[0] });
        }).then(function (result) {
            let expected = accounts[0]
            let actual = result;
            assert.equal(actual, expected, 'The owner should be set to ' + expected);
        })
    });

    it('Test contract owned contract negative condition', function () {
        return Mortal.deployed().then(instance => {
            return instance.owner.call({ from: accounts[1] });
        }).then(result => {
            let expected = accounts[1];
            let actual = result;
            assert.notEqual(actual, expected, 'Owner should not be set to second address in the accounts array');
        })
    });

    contract('Tests for Mortal Contract self destruct', function (accounts) {
        it('Test self destruct functionality', function () {
            return Mortal.deployed().then(instance => {
                instance.kill({ from: accounts[0] });
                return instance.owner.call({ from: accounts[0] });
            }).then(result => {
                assert.equal(1, 2, "Mortal contract instance should not exist");
            }).catch(error => {
                assert.include(error.message, 'is not a contract address', 'Mortal contract instance should not exist');
            })
        });
    })

})
