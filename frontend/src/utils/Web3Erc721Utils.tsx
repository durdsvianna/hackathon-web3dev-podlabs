import { useState, useEffect, useCallback } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useContractRead, useContract, useAccount, useEnsName, useSigner } from 'wagmi';
import NftERC721Artifact from "src/contracts/NftERC721.json";
import contractAddress from "src/contracts/contract-nfterc721-address.json";
import { NftOrder } from 'src/models/nft_order';
import { useIpfsUploader } from "src/utils/IpfsUtils"
  
export function useErc721Contract() {
    const [data, setData] = useState<NftOrder[]>([]);
    const [lastToken, setLastToken] = useState<NftOrder>(null);
    const [counter, setCounter] = useState<number>(-1);
    const [balance, setBalance] = useState<string>('');      
    const [loading, setLoading] = useState(false);
    const contractReadConfig = {
      addressOrName: contractAddress.NftERC721,
      contractInterface: NftERC721Artifact.abi,
    }
    const { data: signer, isError, isLoading } = useSigner();
    const contractConfig = {
      ...contractReadConfig,
      signerOrProvider: signer,
    };
    const contract = useContract(contractConfig);
    const { downloadJsonToPinata } = useIpfsUploader();

    function balanceOf(to): void {
      if (contract != null) {
        try {
          let balancePromise = contract.balanceOf(to);
          console.log("balancePromise", balancePromise);
          balancePromise.then(result => {
              console.log("setBalance", result.toNumber());
              setBalance(result.toNumber());      
            });
        } catch (error) {
          console.log('error', error);
        }
      }            
    }

    async function loadLastNft() {
      //setLoading(true);
      if (contract != null) {
        try {
          const nftQuantity = await contract.idCounter();  
          const uri = await contract.tokenURI(nftQuantity.toNumber()-1);
          setCounter(nftQuantity.toNumber());
          const metadata = downloadJsonToPinata(uri).then(result => {
            //console.log("result", result);        
            const activityJson = JSON.parse(result);
            let rewards:string = ""
            activityJson.attributes.forEach(attr => {
              if (attr.trait_type == 'Rewards')
                rewards = attr.value;
            })
            const nftOrder: NftOrder = 
              {
                tokenId: nftQuantity.toNumber()-1,
                name: activityJson.name,
                description: activityJson.description,
                image: activityJson.image,
                status: 'Concluido',
                attributes: 'Comunidade',
                creatorActivity: 'Douglas',
                tag: 'tag#3',
                dateLimit: 'Dezembro',
                bounty: parseInt(rewards),
                difficulty: 'Avancado',
              };         
            setLastToken(nftOrder); 
            //setLoading(false);    
          });        
        } catch (error) {
          console.log("error", error);
        }
      }
    }


    async function loadNfts () {
      // setLoading(true);
      if (contract != null) {
        try {          
          const nftQuantity = await contract.idCounter();  
          let lastsUriMints: [{tokenId: number; tokenUri: string }] = [{tokenId: -1, tokenUri: ''}];
          let max = nftQuantity.toNumber();
          for(let i = max ; i > 0; i--) {             
            const uri = await contract.tokenURI(nftQuantity.toNumber()-i);
            lastsUriMints.push({
              tokenId: nftQuantity.toNumber()-i, 
              tokenUri: uri
            })            
          }
          
          let nfts: NftOrder[] = [];
          lastsUriMints.slice().reverse().forEach(token => {
            //console.log("token.tokenUri", token.tokenUri);
            if (token.tokenId >= 0) {
              const metadata = downloadJsonToPinata(token.tokenUri).then(result => {
                //console.log("result", result);        
                const activityJson = JSON.parse(result);
                let rewards:string = ""
                activityJson.attributes.forEach(attr => {
                  if (attr.trait_type == 'Rewards')
                    rewards = attr.value;
                })
                const nftOrder: NftOrder = 
                  {
                    tokenId: token.tokenId,
                    name: activityJson.name,
                    description: activityJson.description,
                    image: activityJson.image,
                    status: 'Concluido',
                    attributes: 'Comunidade',
                    creatorActivity: 'Douglas',
                    tag: 'tag#3',
                    dateLimit: 'Dezembro',
                    bounty: parseInt(rewards),
                    difficulty: 'Avancado',
                  };
                nfts.push(nftOrder)
                if (token.tokenId == max -1)
                  setLoading(false);         
              });                                          
            }            
          });  
          setData(nfts)
        } catch (error) {
          console.log("error", error)
        }                       
      }
    }
  
    useEffect(() => {      
        loadNfts();
        loadLastNft();
        balanceOf(process.env.REACT_APP_DAPP_WALLET);
    }, []);

    return { data, loading, counter, lastToken, balance };
  }




  