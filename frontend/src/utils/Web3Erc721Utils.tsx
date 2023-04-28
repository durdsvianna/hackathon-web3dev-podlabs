import { useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useContractRead, useContract, useAccount, useEnsName, useSigner } from 'wagmi';
import NftERC721Artifact from "src/contracts/NftERC721.json";
import contractAddress from "src/contracts/contract-nfterc721-address.json";

const contractReadConfig = {
  addressOrName: contractAddress.NftERC721,
  contractInterface: NftERC721Artifact.abi,
}

export function useShortenAddressOrEnsName() {
    function shortenAddressOrEnsName(length = 5): string {
      const { data: accountData } = useAccount();
      const { data: ensNameData } = useEnsName({ address: accountData?.address });

      const prefix = accountData?.address.slice(0, length + 2);
      const suffix = accountData?.address.slice(accountData?.address.length - length);
  
      return ensNameData ?? `${prefix}...${suffix}`;
    }
  
    return { shortenAddressOrEnsName };
  }

  
export function useErc721Contract() {

    const contractReadConfig = {
      addressOrName: contractAddress.NftERC721,
      contractInterface: NftERC721Artifact.abi,
    }
    const { data: signer, isError, isLoading } = useSigner();
    const contractConfig = {
      ...contractReadConfig,
      signerOrProvider: signer,
    };

    function getBalance(to): string {
      const [balance, setBalance] = useState<string>(" ");
      const contract = useContract(contractConfig);
      let balancePromise = contract.balanceOf(to);
      console.log("balancePromise", balancePromise);
      balancePromise.then(result => {
          console.log("setBalance", ethers.utils.formatEther(result));
          setBalance(ethers.utils.formatEther(result));
        });

      console.log("balance", balance);
      
      return balance;
    }

    async function safeMint(to, tokenUri): Promise<string> {
      const [mintSuccess, setMintSuccess] = useState<boolean>(false);
      const contract = useContract(contractConfig);
      let mintPromise = await contract.safeMint(to, tokenUri);
      console.log("mintPromise", mintPromise);
      mintPromise.then(result => {
          console.log("result", result);
          setMintSuccess(true);
        });
      
      return mintSuccess ? "NFT minted with success!" : "Error! NFT NOT minted!";
    }
  
    return { getBalance, safeMint    };
  }




  