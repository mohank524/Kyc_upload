pragma solidity ^0.5.9;

import "./Mortal.sol";

contract ProveDatabase  is Mortal {
    
    struct File {
        bytes32 docHash;
        bytes32 userName;
        uint docTimestamp;
        bytes ipfsHash;
        bytes docTags;
    }

    struct User {
        address addr;
        bytes32[] documentList;
        mapping(bytes32 => File) documentDetails;
    }

    struct UserUsageCount {
        uint uploadTime;
        uint count;
    }
    
    address[] public allowedContractsKeys;
    address[] public userArr;
    mapping(address => bool) allowedContracts;
    mapping( address => User )  users;
    mapping( address => bool )  admins;
    mapping( bytes32 => File )  files;
    bool public stopped = false;
    
    event LogFallback(address _senderaddr,uint _value);
  
    modifier onlyAllowedContractOrOwner {
        require (allowedContracts[msg.sender] != true && msg.sender != owner,"Should be a owner");
        _;
    }

    function addAllowedContractOrOwner(address _addr) public onlyOwner returns(bool) {
        if( allowedContracts[_addr] == false ) {
            allowedContracts[_addr] = true;
            allowedContractsKeys.push(_addr);
            return true;
        }
        return false;
    }

    function isAllowedContractOrOwner(address _addr) public view returns(bool) {
        return allowedContracts[_addr];
    }
    
    function addFile(address caller, bytes32 _docHash, bytes32 _userName, bytes memory _ipfsHash, bytes memory _docTags) public returns(bool) {
        if(users[caller].documentDetails[_docHash].docHash == 0x0 ){
            userArr.push(caller);
            users[caller].addr = msg.sender;
            users[caller].documentList.push(_docHash);
            users[caller].documentDetails[_docHash] = File(_docHash, _userName,block.timestamp,_ipfsHash,_docTags);
            return true;
        }
        return false;
    }
    
    function getFile(address caller,bytes32 _docHash) public view returns(bytes32, bytes32, uint, bytes memory, bytes memory){
        require(_docHash != 0x0, "File Hash is mandatory");
        File storage document = users[caller].documentDetails[_docHash];
        for (uint i = 0; i < userArr.length; i++){  // Go through all the users to see if file exists.
            if (users[userArr[i]].documentDetails[_docHash].docHash != 0x0 ) {
                document = users[userArr[i]].documentDetails[_docHash];
                break;
            } 
        }
        return(document.docHash,document.userName,document.docTimestamp,document.ipfsHash,document.docTags);
    }
    
    function checkBalance() public view returns(uint){
        return address(this).balance;
    }
    
    function () external payable {
        require(msg.data.length == 0,"Message Length is not zero");
        emit LogFallback(msg.sender,msg.value);
    }

}   
