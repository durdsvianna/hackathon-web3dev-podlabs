//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftERC721 is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;
    uint quantity = 0;
    // Metadata information for each stage of the NFT on IPFS.
    string[] IpfsUri = [
        "https://ipfs.io/ipfs/QmYaTsyxTDnrG4toc8721w62rL4ZBKXQTGj9c9Rpdrntou/seed.json",
        "https://ipfs.io/ipfs/QmYaTsyxTDnrG4toc8721w62rL4ZBKXQTGj9c9Rpdrntou/purple-sprout.json",
        "https://ipfs.io/ipfs/QmYaTsyxTDnrG4toc8721w62rL4ZBKXQTGj9c9Rpdrntou/purple-blooms.json"
    ]; 

    constructor(uint _quantity, string memory _collectionName, string memory _token) ERC721(_collectionName, _token) {
        quantity = _quantity;
    }

    function safeMint(address to, string memory ipfsUri) public {
        uint256 tokenId = tokenIdCounter.current();
        require(tokenId <= quantity, "Dont have more tokens to mint");
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, ipfsUri);
    }

    function transferToken(address from, address to, uint256 tokenId) external {
        require(ownerOf(tokenId) == from, "From address must be token owner");
        _transfer(from, to, tokenId);
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
}
