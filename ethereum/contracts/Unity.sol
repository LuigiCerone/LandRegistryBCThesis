pragma solidity ^0.4.23;


import './Logger.sol';

contract Unity {
    Logger logger;

    // Define the structure of a land.
    struct Land {
        bytes2 district;
        uint document;
        uint landParcel;
        uint subaltern;
        address ownerAddress;
    }

    struct EntryHistory {
        address ownerAddress;
        uint timestamp;
    }

    address public owner;   // address of who creates the contract

    // One landId can have multiple passed owners.
    EntryHistory[] public __history;

    Land public _land;


    // Land addition event, use this to synchronize with the backend.
    event Add(address _owner, uint _landParcel);


    // When the contract is deployed by truffle the account that deploys the contract became the owner,
    // in our case it will be the first account generated by ganache-cli (accounts[0]).
    constructor (address loggerAddress, bytes2 _district, uint _document, uint _landParcel, uint _subaltern, address _ownerAddress) public{
        owner = msg.sender;
        logger = Logger(loggerAddress);

        _land = Land({
            district : _district,
            document : _document,
            landParcel : _landParcel,
            subaltern : _subaltern,
            ownerAddress : _ownerAddress
            });

        // Add history entry for this new land.
        EntryHistory memory myEntry = EntryHistory({
            ownerAddress : _ownerAddress,
            timestamp : block.timestamp
            });
        __history.push(myEntry);

        //        emit Add(_ownerAddress, _landParcel);
        logger.emitNewDeployEvent(address(this));
    }

    // Land transfer event, also use this tho synchronize with the backend.
    event Transfer(address indexed _from, address indexed _to, uint _landParcel);

    // Modifier to check if the address of the calling (from field in the transaction obj) is the owner.
    modifier isOwner{
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Caller (owner/anyone) can transfer a land to the provided buyer if the caller is the owner of the requested land.
    function transferLand(address _landBuyer, uint _landParcel) public returns (bool) {
        // If so, then the land ID is in owner's collection.
        if (_land.landParcel == _landParcel) {
            _land.ownerAddress = _landBuyer;

            // Insert movement in the history mapping.
            EntryHistory memory myEntry = EntryHistory({
                ownerAddress : _landBuyer,
                timestamp : block.timestamp
                });
            __history.push(myEntry);

            // Inform the backend or who is subscribed to the event.
            emit Transfer(msg.sender, _landBuyer, _landParcel);

            return true;
        }
        return false;
    }


    // Get land details of an account.
    function getLand() public view returns (bytes2, uint, uint, uint, address) {
        return (
        _land.district,
        _land.document,
        _land.landParcel,
        _land.subaltern,
        _land.ownerAddress);

    }

    // Return all the movements for a specific land.
    function getHistory(uint _index) public view returns (address, uint) {
        return (
        __history[_index].ownerAddress,
        __history[_index].timestamp
        );
    }

    // Return number of movements for a specific land.
    function getNoOfEntries() public view returns (uint){
        return __history.length;
    }
}