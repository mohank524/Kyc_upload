import getWeb3 from './getWeb3';

const getContract = (contractJSON) => {

    const contract = require('truffle-contract');
    const contractInstance = contract(contractJSON);

    getWeb3.then(results => {
        const web3 = results.web3;
        return web3;
    }).then((web3) => {
        contractInstance.setProvider(web3.currentProvider);
    }).catch((error) => {
        console.log("error", error);
        window.alert(error);
    })
    return contractInstance;
}

export default getContract;
