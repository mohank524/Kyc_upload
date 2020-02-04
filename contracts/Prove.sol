pragma solidity ^0.5.9;

import "./ProveDatabase.sol";
import "./Mortal.sol";

contract Prove is Mortal {

    address payable public storageDatabase;
    bool public stopped = false;

    struct File {
        string ipfsHash;
        bytes32 docHash;
        uint documentTimeStamp;
    }

    constructor(address payable _storageDatabase) public {
        owner = msg.sender;
        storageDatabase = _storageDatabase;
    }

    function setstorageDatabase(address payable _storageDatabase) public onlyOwner returns(bool){
        storageDatabase = _storageDatabase;
        return true;
    }

    event LogFallback(address _senderaddr,uint _value);
    event LogUploadFile(address _addr, bytes32 _userName, bytes32 _dochash, uint _docTimestamp, bytes _ipfsHash, string _notes);

    function uploadFile(bytes32 _docHash, bytes32 _userName, bytes memory _ipfsHash,bytes memory _docTags) public returns(bool) {

        require(_docHash != 0x0,"Please enter a correct document hash.");
        require(_userName.length <= 64,"The userName should be less than 64 bytes");
        require(_ipfsHash.length <= 64,"The ipfsHash should be less than 64 bytes");
        require(_docTags.length <= 64,"The docTags should be less than 64 bytes");

        bool status;
        ProveDatabase proveDatabase = ProveDatabase(storageDatabase);

        status = proveDatabase.addFile(msg.sender,_docHash,_userName,_ipfsHash,_docTags);
        emit LogUploadFile(msg.sender, _userName,_docHash, block.timestamp,_ipfsHash, "upload");

        return status;
    }

    function retrieveFile(bytes32 _docHash) public view returns(bytes32,bytes32,uint,bytes memory,bytes memory) {

        require(_docHash != 0x0, "Please enter a correct document hash.");
        ProveDatabase proveDatabase = ProveDatabase(storageDatabase);
        bytes32 docHash;
        bytes32 userName;
        uint documentTimeStamp;
        bytes memory ipfsHash;
        bytes memory docTags;
        (docHash,userName,documentTimeStamp,ipfsHash,docTags) = proveDatabase.getFile(msg.sender,_docHash);
        return(docHash,userName,documentTimeStamp,ipfsHash,docTags);
    }


    function checkBalance() public view returns(uint){
        return address(this).balance;
    }

    function () external payable {
        require(msg.data.length == 0,"Length of the message is not zero.");
        emit LogFallback(msg.sender,msg.value);
    }

}
