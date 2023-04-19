const path = require("path");
const { ethers, network, run } = require("hardhat")
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../../helper-hardhat-config")

async function deployNftERC721(chainId) {
    
    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();

    console.log("Deploying the ERC-721 contract with the account:", deployerAddress);
    const NftERC721 = await ethers.getContractFactory("NftERC721");
    const erc721 = await NftERC721.deploy(5, "Coleção DUH - Testnet", "DUH");
    console.log("NFT (ERC-721) contract address:", erc721.address);
    await erc721.deployed();
    
    // We also save the contract's artifacts and address in the frontends directories
    saveFrontendFiles(erc721);
    
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await run("verify:verify", {
            address: erc721.address
        })
    }

}


function saveFrontendFiles(erc, template=0) {
    const fs = require("fs");
    var contractsDir = path.join(__dirname, "../../", "frontend", "src", "contracts");
    if (template > 0){
      contractsDir = path.join(__dirname, "../../", "frontend"+template, "src", "contracts");
    }
    
    console.log('Saving frontend files...')
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }    
    
    fs.writeFileSync(
      path.join(contractsDir, "contract-nfterc721-address.json"),
      JSON.stringify({ NftERC721: erc.address }, undefined, 2)
    );
    
    const NftERC721Artifact = artifacts.readArtifactSync("NftERC721");
    
    fs.writeFileSync(
      path.join(contractsDir, "NftERC721.json"),
      JSON.stringify(NftERC721Artifact, null, 2)
    );
        
  }

module.exports = {
  deployNftERC721,
}
