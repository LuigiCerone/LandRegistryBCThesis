pragma solidity ^0.4.17;

contract Unity {
    address owner;
    uint256 value; 
    bytes32 ID; 
    mapping (address => address) history; 
    
    function constrcutor(uint256 price, bytes32 _id) public{
        owner = msg.sender;
        value = price;
        ID = _id;
    }

    function setUnity(uint256 price, bytes32 _id) public {
        owner = msg.sender;
        value = price;
        ID = _id;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function getId() public view returns(bytes32) {
        return ID;
    }
    
    function updateOwner(address _newOwner) public returns(address) {
        owner = _newOwner; 
        history[_newOwner] = owner; 
        return _newOwner; 
        emit UpdatedOwner(_newOwner);
    }
    
    function getPreviousOwner(address currentOwner) public returns(address) {
        return history[currentOwner];
    }
    
    event UpdatedOwner(address newOwner);
}