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
        const hardhatNftERC721 = await NftERC721.deploy("Collection Test", "TST");
    
        await hardhatNftERC721.deployed();
    
        // Fixtures can return anything you consider useful for your tests
        return { NftERC721, hardhatNftERC721, owner, addr1, admin, leader, member};
      }

      async function deployNftERC721WithGrantsFixture() {
        // Get the ContractFactory and Signers here.
        const NftERC721 = await ethers.getContractFactory("NftERC721");
        const [owner, addr1, admin, leader, member] = await ethers.getSigners();
    
        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens onces its transaction has been
        // mined.        
        const hardhatNftERC721 = await NftERC721.deploy("Collection Test", "TST");

        const LEADER_WALLET = leader.address;
        const LEADER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEADER_ROLE"));
        const MEMBER_WALLET = member.address;
        const MEMBER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MEMBER_ROLE"));
          
        await hardhatNftERC721.grantRole(MEMBER_ROLE, MEMBER_WALLET);
        await hardhatNftERC721.grantRole(LEADER_ROLE, LEADER_WALLET);
    
        await hardhatNftERC721.deployed();
    
        // Fixtures can return anything you consider useful for your tests
        return { NftERC721, hardhatNftERC721, owner, admin, leader, member};
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
    
      describe("Access Control", function () {
        it("Should set LEADER role to a wallet and check if the wallet is granted", async function () {
          const { hardhatNftERC721, owner, leader, member } = await loadFixture(deployNftERC721Fixture);
          const LEADER_WALLET = leader.address;
          const LEADER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEADER_ROLE"));
          
          await hardhatNftERC721.grantRole(LEADER_ROLE, LEADER_WALLET);
          expect(await hardhatNftERC721.checkAddressLeader(LEADER_WALLET)).to.equal(true);
        });

        it("Should set MEMBER role to a wallet and check if the wallet is granted", async function () {
          const { hardhatNftERC721, owner, leader, member } = await loadFixture(deployNftERC721Fixture);
          const MEMBER_WALLET = member.address;
          const MEMBER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MEMBER_ROLE"));
          
          await hardhatNftERC721.grantRole(MEMBER_ROLE, MEMBER_WALLET);
          expect(await hardhatNftERC721.checkAddressMember(MEMBER_WALLET)).to.equal(true);
        });
      });

      describe("Transactions (with role grants)", function () {
        it("Should mint a NFT to the contract", async function () {
          const { hardhatNftERC721, owner, leader, member } = await loadFixture(deployNftERC721WithGrantsFixture);
          const tokenUri = "{\"name\":\"Atividade 4\",\"description\":\"Descrição da atividade 4\",\"image\":\"https://gateway.pinata.cloud/ipfs/QmW78MP2JunDmEEnVuVcAzqamm2vZj8rfEq3FFXU6qo1qB\",\"external_url\":\"https://github.com/durdsvianna/\",\"background_color\":\"\",\"animation_url\":\"\",\"youtube_url\":\"\",\"attributes\":[{\"trait_type\":\"Status\",\"value\":\"2\"},{\"trait_type\":\"Dificulty\",\"value\":\"2\"},{\"trait_type\":\"Expire Date\",\"value\":\"2023-04-30T03:00:00.000Z\"},{\"trait_type\":\"Rewards\",\"value\":\"230\"}]}"
          //mint nfts
          var balanceBefore = await hardhatNftERC721.balanceOf(hardhatNftERC721.address);
          console.log(`Mintando!`);
          await hardhatNftERC721.connect(leader).safeMint(hardhatNftERC721.address, JSON.parse(tokenUri));
          var counterTokenId = (await hardhatNftERC721.tokenIdCounter())-1;
          console.log(`Minted to the contract! -> tokenId=`+counterTokenId);

          var balanceAfter = await hardhatNftERC721.balanceOf(hardhatNftERC721.address);
          console.log(
            `=> Balance of contract ${hardhatNftERC721.address} is ${balanceBefore} on ${network.name} 
              => Balance of contract ${hardhatNftERC721.address} is ${balanceAfter} on ${network.name}`
          )
                   
          await expect(balanceBefore).to.not.equals(balanceAfter);                  
        });

        it("Should mint a NFT to the contract and transfer NFTs between accounts", async function () {
          const { hardhatNftERC721, owner, leader, member } = await loadFixture(deployNftERC721WithGrantsFixture);
          const tokenUri = "{\"name\":\"Atividade 4\",\"description\":\"Descrição da atividade 4\",\"image\":\"https://gateway.pinata.cloud/ipfs/QmW78MP2JunDmEEnVuVcAzqamm2vZj8rfEq3FFXU6qo1qB\",\"external_url\":\"https://github.com/durdsvianna/\",\"background_color\":\"\",\"animation_url\":\"\",\"youtube_url\":\"\",\"attributes\":[{\"trait_type\":\"Status\",\"value\":\"2\"},{\"trait_type\":\"Dificulty\",\"value\":\"2\"},{\"trait_type\":\"Expire Date\",\"value\":\"2023-04-30T03:00:00.000Z\"},{\"trait_type\":\"Rewards\",\"value\":\"230\"}]}"
          //mint nfts
          console.log(`Minting!`);
          await hardhatNftERC721.connect(leader).safeMint(hardhatNftERC721.address, JSON.parse(tokenUri));
          var counterTokenId = (await hardhatNftERC721.tokenIdCounter())-1;
          console.log(`Minted to the contract! -> tokenId=`+counterTokenId);

          var balanceContract = await hardhatNftERC721.balanceOf(hardhatNftERC721.address);
          var balanceMember = await hardhatNftERC721.balanceOf(member.address);
          console.log(
            `=> Balance of contract ${hardhatNftERC721.address} is ${balanceContract} on ${network.name} 
              => Balance of member  ${member.address} is ${balanceMember} on ${network.name}`
          )
          
          // Aprove member
          console.log(`Approve of owner of token..`);
          await hardhatNftERC721.setApprovalForAll(hardhatNftERC721.address, counterTokenId);
          console.log(`Approved!`);  

          // Transfer 1 NFT from owner to addr1
          console.log(`Transfer the NFT..`);
          await hardhatNftERC721.transferFrom(hardhatNftERC721.address, member.address, counterTokenId);
          console.log(`Transferred!`);  
          
          var balanceMember = await hardhatNftERC721.balanceOf(member.address);
          var balanceContract = await hardhatNftERC721.balanceOf(hardhatNftERC721.address);
          console.log(
            `=> Balance of contract ${hardhatNftERC721.address} is ${balanceContract} on ${network.name} 
              => Balance of member  ${member.address} is ${balanceMember} on ${network.name}`
          )
          await expect(await hardhatNftERC721.balanceOf(member.address))
            .to.equals(1);   
          await expect(await hardhatNftERC721.balanceOf(hardhatNftERC721.address))
            .to.equals(0);                    
        });
      });      
    }); 