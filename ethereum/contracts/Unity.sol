pragma solidity ^0.4.23;


contract Unity {
    struct Land {
        uint landParcel;
        address ownerAddress;
        //        string location;
        //        uint cost;
        uint landID;
    }

    address public owner;   // government who creates the contract

    // one landId can have multiple owners.
    mapping(uint => address[]) public __history;

    //one account can hold many lands (many landTokens, each token one land)
    mapping(address => Land[]) public __ownedLands;
    uint public totalLandsCounter; //total no of lands via this contract at any time

    //define who is owner
    constructor () public{
        owner = msg.sender;
        totalLandsCounter = 0;
    }

    //land addition event
    event Add(address _owner, uint _landID);

    //land transfer event
    event Transfer(address indexed _from, address indexed _to, uint _landID);

    modifier isOwner{
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Modifier used to check if current land is already present in the array associated to the user.
    modifier isUnique (uint _landParcel, address _ownerAddress){
        bool duplicate = false;
        for (uint i = 0; i < (__ownedLands[_ownerAddress].length); i++) {
            if (__ownedLands[_ownerAddress][i].landParcel == _landParcel) {
                duplicate = true;
                break;
            }
        }
        require(duplicate == false, "Duplicate land");
        _;
    }




    //1. FIRST OPERATION
    //owner shall add lands via this function
    //    function addLand(string _location, uint _cost) public isOwner {
    function addLand(uint _landParcel, address _ownerAddress) public isOwner isUnique(_landParcel, _ownerAddress) returns (address) {

        totalLandsCounter = totalLandsCounter + 1;
        Land memory myLand = Land({
            landParcel : _landParcel,
            ownerAddress : _ownerAddress,
            //                location: _location,
            //                cost: _cost,
            landID : totalLandsCounter
            });
        __ownedLands[_ownerAddress].push(myLand);

        // Add history entry for this new land.
        __history[totalLandsCounter].push(_ownerAddress);

        emit Add(_ownerAddress, totalLandsCounter);
        return msg.sender;
    }


    //2. SECOND OPERATION
    //caller (owner/anyone) to transfer land to buyer provided caller is owner of the land
    function transferLand(address _landBuyer, uint _landParcel) public returns (bool) {
        //find out the particular land ID in owner's collection
        for (uint i = 0; i < (__ownedLands[msg.sender].length); i++) {
            //if given land ID is indeed in owner's collection
            if (__ownedLands[msg.sender][i].landParcel == _landParcel) {
                //copy land in new owner's collection
                Land memory myLand = Land(
                    {
                    landParcel : _landParcel,
                    ownerAddress : _landBuyer,
                    landID : __ownedLands[msg.sender][i].landID
                    //                        location: __ownedLands[msg.sender][i].location,
                    //                        cost: __ownedLands[msg.sender][i].cost,
                    });
                __ownedLands[_landBuyer].push(myLand);

                //remove land from current ownerAddress
                delete __ownedLands[msg.sender][i];

                // Insert movement in the history mapping.
                __history[__ownedLands[msg.sender][i].landID].push(_landBuyer);

                //inform the world
                emit Transfer(msg.sender, _landBuyer, _landParcel);

                return true;
            }
        }

        //if we still did not return, return false
        return false;
    }


    //3. THIRD OPERATION
    //get land details of an account
    function getLand(address _landHolder, uint _index) public view returns (uint, address, uint) {
        return (
        //        __ownedLands[_landHolder][_index].location,
        //        __ownedLands[_landHolder][_index].cost,
        __ownedLands[_landHolder][_index].landParcel,
        __ownedLands[_landHolder][_index].ownerAddress,
        __ownedLands[_landHolder][_index].landID);

    }

    //4. GET TOTAL NO OF LANDS OWNED BY AN ACCOUNT AS NO WAY TO RETURN STRUCT ARRAYS
    function getNoOfLands(address _landHolder) public view returns (uint) {
        return __ownedLands[_landHolder].length;
    }


    //    function toString() public view {
    //        for (uint i = 0; i < totalLandsCounter; i++) {
    //            console.log(__ownedLands[i]);
    //        }
    //    }

    // Return all the movements for a specific land.
    function getHistoryForLand(uint _landId) public view returns (address[]) {
        return __history[_landId];
    }


}