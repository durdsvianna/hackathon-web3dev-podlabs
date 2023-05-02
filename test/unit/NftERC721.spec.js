const { network, ethers } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { developmentChains } = require("../../helper-hardhat-config")
const { expect } = require("chai");
const { BigNumber } = require("ethers");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NftERC721 contract", function () {
      // We define a fixture to reuse the same setup in every test. We use
      // loadFixture to run this setup once, snapshot that state, and reset Hardhat
      // Network to that snapshot in every test.
      async function deployNftERC721Fixture() {
        // Get the ContractFactory and Signers here.
        const NftERC721 = await ethers.getContractFactory("NftERC721");
        const [owner, addr1, admin, leader, member] = await ethers.getSigners();
    
        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens onces its transaction has been
        // mined.
        const deployerAddress = await owner.getAddress();
        const hardhatNftERC721 = await NftERC721.deploy("Collection Test", "TST", deployerAddress);
    
        await hardhatNftERC721.deployed();
    
        // Fixtures can return anything you consider useful for your tests
        return { NftERC721, hardhatNftERC721, owner, addr1, admin, leader, member};
      }
    
      // You can nest describe calls to create subsections.
      describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.
    
        // If the callback function is async, Mocha will `await` it.
        it("Should set the right owner", async function () {
          // We use loadFixture to setup our environment, and then assert that
          // things went well
          const { hardhatNftERC721, owner } = await loadFixture(deployNftERC721Fixture);
    
          // Expect receives a value and wraps it in an assertion object. These
          // objects have a lot of utility methods to assert values.
    
          // This test expects the owner variable stored in the contract to be
          // equal to our Signer's owner.
          expect(await hardhatNftERC721.signer.getAddress()).to.equal(owner.address);
        });
    
        it("Should assign the total supply of NFTs to the owner", async function () {
          const { hardhatNftERC721, owner } = await loadFixture(deployNftERC721Fixture);
          const ownerBalance = await hardhatNftERC721.balanceOf(owner.address);
          expect(await hardhatNftERC721.tokenIdCounter()).to.equal(ownerBalance);
        });
      });
    
      describe("Transactions", function () {
        it("Should mint a NFT and transfer NFTs between accounts", async function () {
          const { hardhatNftERC721, owner, addr1 } = await loadFixture(deployNftERC721Fixture);
          const tokenUri = "{\"name\":\"Atividade 4\",\"description\":\"Descrição da atividade 4\",\"image\":\"https://gateway.pinata.cloud/ipfs/QmW78MP2JunDmEEnVuVcAzqamm2vZj8rfEq3FFXU6qo1qB\",\"external_url\":\"https://github.com/durdsvianna/\",\"background_color\":\"\",\"animation_url\":\"\",\"youtube_url\":\"\",\"attributes\":[{\"trait_type\":\"Status\",\"value\":\"2\"},{\"trait_type\":\"Dificulty\",\"value\":\"2\"},{\"trait_type\":\"Expire Date\",\"value\":\"2023-04-30T03:00:00.000Z\"},{\"trait_type\":\"Rewards\",\"value\":\"230\"}]}"
          //mint nfts
          console.log(`Mintando!`);
          await hardhatNftERC721.safeMint(owner.address, JSON.parse(tokenUri));
          var counterTokenId = (await hardhatNftERC721.tokenIdCounter())-1;
          console.log(`Mintada! -> tokenId=`+counterTokenId);

          var balanceAddr1 = await hardhatNftERC721.balanceOf(await addr1.getAddress());
          var balanceOwner = await hardhatNftERC721.balanceOf(await owner.getAddress());
          console.log(
            `=> Balance of ${owner.address} is ${balanceOwner} on ${network.name} 
              => Balance of ${addr1.address} is ${balanceAddr1} on ${network.name}`
          )
          
          // Transfer 1 NFT from owner to addr1
          console.log(`Tranferindo a NFT!`);
          await hardhatNftERC721.transferFrom(owner.address, addr1.address, counterTokenId);
          console.log(`Transferida!`);  
          
          var balanceAddr1 = await hardhatNftERC721.balanceOf(await addr1.getAddress());
          var balanceOwner = await hardhatNftERC721.balanceOf(await owner.getAddress());
          console.log(
            `=> Balance of ${owner.address} is ${balanceOwner} on ${network.name} 
              => Balance of ${addr1.address} is ${balanceAddr1} on ${network.name}`
          )
          await expect(await hardhatNftERC721.balanceOf(await addr1.getAddress()))
            .to.equals(1);   
          await expect(await hardhatNftERC721.balanceOf(await owner.getAddress()))
            .to.equals(0);                    
        });
      });

      describe("Acess Control", function () {
        it("Should set ADMIN role to owner", async function () {
          const { hardhatNftERC721, admin, leader, member } = await loadFixture(deployNftERC721Fixture);
          const LEADER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEADER_ROLE"));
          const MEMBER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MEMBER_ROLE"));
          await hardhatNftERC721.safeMint(owner.address);
          
        });
      });
    }); 