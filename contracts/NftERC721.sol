//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract NftERC721 is ERC721, ERC721URIStorage, AccessControl, IERC721Receiver {

    struct Activity {
        uint256 tokenId;
        string status;
        string tokenUri;
    }

    using Counters for Counters.Counter;
    Counters.Counter public tokenIdCounter;    

    event NftMinted(bool isMinted);
    event NftTransferred(bool isMinted);

    address public owner;
    
    bytes32 public constant LEADER_ROLE = keccak256("LEADER_ROLE");
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");

    mapping(uint256 => Activity) private _activities;
    mapping(uint256 => bool) private _availableActivities;
    mapping(uint256 => address) private _activityOwners;



    constructor(string memory _collectionName, string memory _token) ERC721(_collectionName, _token) payable {
        owner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, owner);
    }

    function grantRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(DEFAULT_ADMIN_ROLE)) {
        _grantRole(role, account);
    }

    /**
     * @dev Member get the rights to work on in the NFT Activity Bounty
     *
     * Requirements:
     *
     * - Should be a Member
     * - Activity Should be avaiable
     *
     * Emits a {nftStatus} event.
     */
    function setActivityOwner(uint256 tokenId, address to) public {
        // Requer que NFT mintado esteja disponível
        require(_availableActivities[tokenId], "Activity not available!");
        // TODO: Requer q a data atual não tenha ultrapassado a data de expiração da atividade
        
        //atualiza status da atividade
        _activities[tokenId].status = "In Progress";

        //remove da lista de disponíveis 
        delete _availableActivities[tokenId]; 

        //atribui o membro como dono da atividade       
        _activityOwners[tokenId] = to;
    }

    /**
     * @dev Returns the activity owner of the `tokenId`. Does NOT revert if token doesn't exist
     */
    function activityOwnerOf(uint256 tokenId) public view virtual returns (address) {    
        address addr = _activityOwners[tokenId];
        return addr;
    }

    /**
     * @dev Return true if the activity is avilable
     */
    function isAvailableActivity(uint256 tokenId) public view virtual returns (bool) {    
        return _availableActivities[tokenId];
    }

    /**
     * @dev Return true if the activity is avilable
     */
    function getActivity(uint256 tokenId) public view virtual returns (Activity memory) {    
        return _activities[tokenId];
    }
    
    
    /**
     * @dev See {ipfsUri}
     * 
     * Requirements:
     *
     * - Should be a `LEADER_ROLE`
     *
     * Emits a {NftMinted} event.
     */
    function safeMint(address to, string memory ipfsUri) public onlyRole(LEADER_ROLE) {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, ipfsUri);

        //create activity
        Activity memory activity;
        activity.tokenId = tokenId;
        activity.tokenUri = ipfsUri;
        activity.status = "Available";

        _availableActivities[tokenId] = true;
        _activities[tokenId] = activity;
        
        // EVENT
        emit NftMinted(true);
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override onlyRole(DEFAULT_ADMIN_ROLE) {
        setApprovalForAll(to, true);
        _transfer(from, to, tokenId);

        // EVENT
        emit NftTransferred(true);
    }
    
    function checkAddressMember(address account) public view returns(bool) {
        return hasRole(MEMBER_ROLE, account);
    }

    function checkAddressLeader(address account) public view returns(bool) {
        return hasRole(LEADER_ROLE, account);
    }

    // The following functions is an override required by Solidity.
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    // The following functions is an override required by Solidity.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function lastMinted() public view returns (string memory) {
        uint256 tokenId = tokenIdCounter.current();
        if (tokenId == 0)
            return "";
        if (tokenId > 0)
            return tokenURI(tokenId - 1);
        else 
            return tokenURI(tokenId);
    }   

    function idCounter() public view returns (uint256) {
        return tokenIdCounter.current();
    }   

    
    // The following functions is an override required by Solidity.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

}

