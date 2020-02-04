pragma solidity ^0.5.9;

contract Owned {
    
    address payable public owner;

    modifier onlyOwner(){
        require(msg.sender == owner, "You are not the owner of the contract");
        _;
    }
   
    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address payable _newOwner) public onlyOwner {
        require(_newOwner != msg.sender,"Address cannot be 0x0");
        owner = _newOwner;
    }
}

contract Mortal is Owned {

    function kill() public onlyOwner{
        require(msg.sender == owner,"You are not the owner of the contract");
        selfdestruct(owner);
    }
}