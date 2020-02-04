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


Enter the project directory

```
cd kyc
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

This section describes how to run the automated tests for this dapp. 

Enter the project root directory

```
cd kyc
```

Run tests

```
truffle test
```
