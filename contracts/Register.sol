pragma solidity ^0.5.9;

import "./Mortal.sol";

contract Register is Mortal {
    
    address backendContract;
    address[] public previousBackends;
    
    event LogCurrentVersion(address _address);
    
    modifier onlyOwner() {
        require(msg.sender == owner,"Sender is not owner");
        _;
    }
    
    constructor(address initAddr) public {
        backendContract = initAddr;
        owner = msg.sender;
    }
    
    function changeContractVersion(address _newBackend) public onlyOwner() returns (bool)
    {
        if(_newBackend != backendContract) {
            previousBackends.push(backendContract);
            backendContract = _newBackend;
            return true;
        }
        emit LogCurrentVersion(backendContract);
        return false;
    }
    
}