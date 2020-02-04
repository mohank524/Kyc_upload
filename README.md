# KYC file upload 

### Requirements
These are the dependencies:

`nodejs` 
`npm` 
`Truffle` 
`MetaMask` 
`ganache-cli`
`truffle-hdwallet-provider` 
`Solidity` 

### Installation

This is a step by step guide to set up the project.

Clone the project repository.

```
https://github.com/mohank524/Kyc_upload.git
```

Enter the project directory

```
cd Kyc_upload
```

Install the node modules

```
npm install
```

Compile the smart contracts

```
truffle compile
```

Start the development blockchain network to work on a local network

```
ganache-cli
```

Migrate the smart contracts. The --reset option runs all the migration from the beginning.

```
truffle migrate --reset
```

Start the dapp

```
npm run start
```

A tab should pop up in your browser. Otherwise go to the following link.

```
http://localhost:3000/
```

## Running the tests

Run tests

```
truffle test
```
