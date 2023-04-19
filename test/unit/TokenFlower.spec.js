const { network, ethers } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { developmentChains } = require("../../helper-hardhat-config")
const { expect } = require("chai");
const { BigNumber } = require("ethers");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Flower contract", function () {
      // We define a fixture to reuse the same setup in every test. We use
      // loadFixture to run this setup once, snapshot that state, and reset Hardhat
      // Network to that snapshot in every test.
      async function deployFlowerFixture() {
        // Get the ContractFactory and Signers here.
        const Flower = await ethers.getContractFactory("Flower");
        const [owner, addr1] = await ethers.getSigners();
    
        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens onces its transaction has been
        // mined.
        const hardhatFlowerNft = await Flower.deploy(5);
    
        await hardhatFlowerNft.deployed();
    
        // Fixtures can return anything you consider useful for your tests
        return { Flower, hardhatFlowerNft, owner, addr1 };
      }
    
      // You can nest describe calls to create subsections.
      describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.
    
        // If the callback function is async, Mocha will `await` it.
        it("Should set the right owner", async function () {
          // We use loadFixture to setup our environment, and then assert that
          // things went well
          const { hardhatFlowerNft, owner } = await loadFixture(deployFlowerFixture);
    
          // Expect receives a value and wraps it in an assertion object. These
          // objects have a lot of utility methods to assert values.
    
          // This test expects the owner variable stored in the contract to be
          // equal to our Signer's owner.
          expect(await hardhatFlowerNft.signer.getAddress()).to.equal(owner.address);
        });
    
        it("Should assign the total supply of NFTs to the owner", async function () {
          const { hardhatFlowerNft, owner } = await loadFixture(deployFlowerFixture);
          const ownerBalance = await hardhatFlowerNft.balanceOf(owner.address);
          expect(await hardhatFlowerNft.tokenIdCounter()).to.equal(ownerBalance);
        });
      });
    
      describe("Transactions", function () {
        it("Should transfer NFTs between accounts", async function () {
          const { hardhatFlowerNft, owner, addr1 } = await loadFixture(deployFlowerFixture);
          
          //mint nfts
          console.log(`Mintando!`);
          await hardhatFlowerNft.safeMint(owner.address);
          var counterTokenId = (await hardhatFlowerNft.tokenIdCounter())-1;
          console.log(`Mintada! -> tokenId=`+counterTokenId);

          var balanceAddr1 = await hardhatFlowerNft.balanceOf(await addr1.getAddress());
          var balanceOwner = await hardhatFlowerNft.balanceOf(await owner.getAddress());
          console.log(
            `=> Balance of ${owner.address} is ${balanceOwner} on ${network.name} 
              => Balance of ${addr1.address} is ${balanceAddr1} on ${network.name}`
          )
          
          // Transfer 1 NFT from owner to addr1
          console.log(`Tranferindo a NFT!`);
          await hardhatFlowerNft.transferToken(owner.address, addr1.address, counterTokenId);
          console.log(`Transferida!`);  
          
          var balanceAddr1 = await hardhatFlowerNft.balanceOf(await addr1.getAddress());
          var balanceOwner = await hardhatFlowerNft.balanceOf(await owner.getAddress());
          console.log(
            `=> Balance of ${owner.address} is ${balanceOwner} on ${network.name} 
              => Balance of ${addr1.address} is ${balanceAddr1} on ${network.name}`
          )
          await expect(await hardhatFlowerNft.balanceOf(await addr1.getAddress()))
            .to.equals(1);   
          await expect(await hardhatFlowerNft.balanceOf(await owner.getAddress()))
            .to.equals(0);                    
        });
      });
      //   it("should emit Transfer events", async function () {
      //     const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
      //     //mint tokens
      //     await hardhatToken.mint(addr1.address, ethers.utils.parseEther("1"));
      //     await hardhatToken.mint(addr2.address, ethers.utils.parseEther("1"));
      //     await hardhatToken.mint(owner.address, ethers.utils.parseEther("1"));
          
      //     // Transfer 50 tokens from owner to addr1
      //     await expect(hardhatToken.connect(owner).transfer(addr1.address, 50))
      //       .to.emit(hardhatToken, "Transfer").withArgs(owner.address, addr1.address, 50)
    
      //     // Transfer 50 tokens from addr1 to addr2
      //     // We use .connect(signer) to send a transaction from another account
      //     await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
      //       .to.emit(hardhatToken, "Transfer").withArgs(addr1.address, addr2.address, 50)
      //   });
    
      //   it("Should fail if sender doesn't have enough tokens", async function () {
      //     const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
      //     const initialOwnerBalance = await hardhatToken.balanceOf(
      //       owner.address
      //     );          

      //     //mint tokens
      //     await hardhatToken.mint(addr1.address, ethers.utils.parseEther("1"));

      //     // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
      //     // `require` will evaluate false and revert the transaction.
      //     await expect(
      //       hardhatToken.connect(addr1).transfer(owner.address, ethers.utils.parseEther("9"))
      //     ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    
      //     // Owner balance shouldn't have changed.
      //     expect(await hardhatToken.balanceOf(owner.address)).to.equal(
      //       initialOwnerBalance
      //     );
      //   });
      // });
    }); 