//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract NftERC721 is ERC721, ERC721URIStorage, AccessControl {

    using Counters for Counters.Counter;
    Counters.Counter public tokenIdCounter;    

    event NftMinted(bool isMinted);

    address public owner;
    
    bytes32 public constant LEADER_ROLE = keccak256("LEADER_ROLE");
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");

    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory _collectionName, string memory _token, address admin ) ERC721(_collectionName, _token) payable {
        owner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
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
    function getActivity() public onlyRole(MEMBER_ROLE) {
        // Requer que NFT mintado não tenha sido pego
        // Se Nft não tiver sido mintado consigo entrar na whitelist para mintar o nft
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
        
        // EVENT
        emit NftMinted(true);
    }
    
    function CheckAddressMember() public view returns(bool) {

    }

    // function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) public onlyRole(LEADER_ROLE){
    //     uint256 tokenId = tokenIdCounter.current();
    //     tokenIdCounter.increment();
    //     onERC721Received(to, from, tokenId, data);
    //     _setTokenURI(tokenId, ipfsUri);

    //     emit NftMinted(true);
    // }

    // safeTransferFrom(msg.sender, address(onERC721Received()), tokenId, "");

    // function onERC721Received(
    //     address operator,
    //     address from,
    //     uint256 tokenId,
    //     bytes calldata data
    // ) external returns (bytes4);

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

}

