var HDWalletProvider = require("truffle-hdwallet-provider");
var seedWords = "flavor cabin wash capable flavor target lens ginger enact zone solve bird";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  mocha: {
    useColors: true
  },

  networks: {

    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },

    ropsten: {
      provider: function () {
        return new HDWalletProvider(seedWords, "https://rinkeby.infura.io/");
      },
      network_id: '3',
      gas: 4500000
    },

    rinkeby: {
      provider: function () {
        return new HDWalletProvider(seedWords, "https://rinkeby.infura.io/v3/e3c576966e4540f8bdcd0c503be6c949");
      },
      network_id: '4',
      gas: 4500000
    }

  },
  compilers: {
    solc: {
      version: "0.5.9" 
    }
  }

};
