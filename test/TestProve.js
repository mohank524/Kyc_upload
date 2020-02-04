var Prove = artifacts.require('Prove.sol');
var Web3 = require('web3');

contract('Prove contract test suite', function (accounts) {

    let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    let docTags = web3.utils.fromAscii("Blockchain, Ethereum, Solidity")

    it('Test: File retrieve on Empty Contract', function () {

        let docHash = "0xf50aab0582320e332b469f450e38f45e77f0926dfe07cf56ee661707207a5419";
        const account_one = accounts[0];
        return Prove.deployed().then(function (instance) {
            return instance.retrieveFile.call(docHash, { from: account_one });
        }).then(function (result) {
            let expected = 0x0;
            let actual = result[0];
            assert.equal(actual, expected, 'None if the file not exist in blockchain. Default value for bytes32 should be returned 0x0');
        })
    });

    it('Test: File upload functionality', function () {

        let docHash = "0x83fe5282995e8e08e1acc5104b3178637b33f0f0b1b4942e466cca005245e7ee";
        let docOwnerName = "0x7372656573617261646869";
        let ipfsHash = "QmUd5cKE6843KMEtnFQ9CvfHUKfzQ4E1VSsj1ihkHBgk7i";
        let account_one = accounts[0];

        return Prove.deployed().then(function (instance) {
            instance.uploadFile(docHash, docOwnerName, ipfsHash, docTags, { from: account_one });
            return instance.retrieveFile.call(docHash, { from: account_one });
        }).then(function (result) {
            //console.log("result = ", result);
            //console.log("name = ", web3.toAscii(result[1]));
            let expected = docHash;
            let actual = result[0];
            assert.equal(actual, expected, 'File Successfully Added');
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
