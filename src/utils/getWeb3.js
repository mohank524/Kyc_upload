import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {

  window.addEventListener('load', function () {
    var results
    var web3 = window.web3

     if (!window.web3) {
       window.alert('Please install MetaMask to start using the Dapp.');
       return;
     }

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(window.web3.currentProvider)
      results = {
        web3: web3
      }
      console.log('getWeb3: Injected web3 detected.');
      this.console.log(results)

      resolve(results)
    } else {

      var provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
      web3 = new Web3(provider)
      results = {
        web3: web3
      }
      console.log('getWeb3: No web3 instance injected, using Local web3.');
      resolve(results)
    }
    this.console.log(web3.eth.coinbase)
     if (!web3.eth.coinbase) {
       window.alert('Please activate MetaMask to start entering the Dapp.');
       return;
     }
  })
})

export default getWeb3;
