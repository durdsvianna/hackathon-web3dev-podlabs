//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftERC721 is ERC721, ERC721URIStorage {
    event NftMinted(bool isMinted);
    event RoleCreated(bytes32 roleId);
    event RoleRemoved(bytes32 roleId);
    event MemberAdded(address member, bytes32 roleId);
    event MemberRemoved(address member, bytes32 roleId);

    using Counters for Counters.Counter;
    address public owner;
    Counters.Counter public tokenIdCounter;
    bytes32 public constant ROOT_ROLE = "ROOT";

    struct Role {
        bool exists;
        bytes32 adminRoleId;
        mapping (address => bool) members; 
    }    
        
    mapping (bytes32 => Role) internal roles;    
    
    
    constructor(string memory _collectionName, string memory _token) ERC721(_collectionName, _token) payable {
        owner = msg.sender;
        Role storage role = roles[0];
        role.adminRoleId = ROOT_ROLE;
        roles[role.adminRoleId].members[owner] = true;                
    }

    //ACCESS CONTROL FUNCTIONS
    function roleExists(bytes32 _roleId) public view returns(bool) {
        return (roles[_roleId].exists);
    }

    function hasRole(address _member, bytes32 _roleId) public view returns(bool) {
        require(roleExists(_roleId), "Role doesn't exist.");                        
        return roles[_roleId].members[_member];
    }    

    // function addRole(bytes32 _roleId, bytes32 _adminRoleId) public {
    //     // require(_roleId != NO_ROLE, "Reserved role id.");
    //     require(!roleExists(_roleId), "Role already exists.");
    //     require(roleExists(_adminRoleId), "Admin role doesn't exist.");
    //     require(hasRole(msg.sender, _adminRoleId), "Not admin of role.");
    //     Role storage role = {};
    //     role.adminRoleId = ROOT_ROLE;
    //     roles[_roleId] = Role({ exists: true, adminRoleId: _adminRoleId });
    //     emit RoleCreated(_roleId);
    // }

    function addMember(address _member, bytes32 _roleId) public {
        require(roleExists(_roleId), "Role doesn't exist.");
        require(
            hasRole(msg.sender, roles[_roleId].adminRoleId),
            "User can't add members."
        );
        require(
            !hasRole(_member, _roleId),
            "Address is member of role."
        );
        roles[_roleId].members[_member] = true;
        emit MemberAdded(_member, _roleId);
    }

    function removeMember(address _member, bytes32 _roleId) public {
        require(roleExists(_roleId), "Role doesn't exist.");
        require(
            hasRole(msg.sender, roles[_roleId].adminRoleId),
            "User can't remove members."
        );
        require(
            hasRole(_member, _roleId),
            "Address is not member of role."
        );

        delete roles[_roleId].members[_member];
        emit MemberRemoved(_member, _roleId);
    }


    //NFT FUNCTIONS
    function safeMint(address to, string memory ipfsUri) public {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, ipfsUri);
        
        // EVENT
        emit NftMinted(true);
    }

    // helper function to compare strings
    function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
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

}

