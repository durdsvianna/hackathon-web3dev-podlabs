import { useState, useEffect, SetStateAction } from 'react';
import { useContract, useSigner } from 'wagmi';
import NftERC721Artifact from "src/contracts/NftERC721.json";
import contractAddress from "src/contracts/contract-nfterc721-address.json";
import { NftOrder } from 'src/models/nft_order';
import { useIpfsUploader } from "src/utils/IpfsUtils"
import { useWalletAddress } from './Web3Utils';
  
export function useErc721Contract() {
    const [data, setData] = useState<NftOrder[]>([]);
    const [lastToken, setLastToken] = useState<NftOrder>(null);
    const [counter, setCounter] = useState<number>(-1);
    const [balance, setBalance] = useState<string>('');      
    const [loading, setLoading] = useState(false);
    const [checkMember, setCheckMember] = useState(true);
    const [checkLeader, setCheckLeader] = useState(false);

    const contractReadConfig = {
      addressOrName: contractAddress.NftERC721,
      contractInterface: NftERC721Artifact.abi,
    }
    const { data: signer } = useSigner();
    const contractConfig = {
      ...contractReadConfig,
      signerOrProvider: signer,
    };
    const contract = useContract(contractConfig);
    const { downloadJsonFromPinata, downloadListFromPinata } = useIpfsUploader();
    const ipfsGateway = process.env.REACT_APP_IPFS_GATEWAY;

    function balanceOf(to: string): void {
      if (contract != null) {
        try {
          let balancePromise = contract.balanceOf(to);
          console.log("balancePromise", balancePromise);
          balancePromise.then((result: { toNumber: () => SetStateAction<string>; }) => {
              console.log("setBalance", result.toNumber());
              setBalance(result.toNumber());      
            });
        } catch (error) {
          console.log('error', error);
        }
      }            
    }

    async function loadLastNft() {
      setLoading(true);
      if (contract != null) {
        try {
          const nftQuantity = await contract.idCounter();  
          const uri = await contract.tokenURI(nftQuantity.toNumber()-1);
          const nftOwner = await contract.ownerOf(nftQuantity.toNumber()-1); 
          console.log("nftOwner", nftOwner);
          setCounter(nftQuantity.toNumber());
          const metadata = downloadJsonFromPinata(ipfsGateway+uri).then(result => {
            console.log("result", result);        
            const activityJson = JSON.parse(result);
            let rewards:number 
            console.log("ACTIVITY JSON = ",activityJson)
            activityJson.attributes.forEach((attr: { trait_type: string; value: number; }) => {
              if (attr.trait_type == 'Rewards')
                rewards = attr.value;
            })            
            const nftOrder: NftOrder = 
              {
                owner: nftOwner,
                tokenId: nftQuantity.toNumber()-1,
                name: activityJson.name,
                description: activityJson.description,
                image: ipfsGateway + activityJson.image,
                status: 'Concluido',
                attributes: 'Comunidade',
                creatorActivity: 'Douglas',
                tag: 'tag#3',
                dateLimit: 'Dezembro',
                bounty: rewards,
                difficulty: 'Avancado',
              };         
            setLastToken(nftOrder); 
            console.log("nftOrder", nftOrder);    
            // setLoading(false);    
          });        
        } catch (error) {
          console.log("error", error);
          setLoading(false)
        }
      }
    }

    async function loadListNfts() {
      let lastsUriMints: [{tokenId: number; ipfsHash: string }] = [{tokenId: -1, ipfsHash: ''}];
      if (contract != null) {
        try {          
          const nftQuantity = await contract.idCounter();            
          let max = nftQuantity.toNumber();
          for(let i = max ; i > 0; i--) {             
            const uri = await contract.tokenURI(nftQuantity.toNumber()-i);
            const ipfsHash = uri.split("/")[4]; 
            lastsUriMints.push({
              tokenId: nftQuantity.toNumber()-i, 
              ipfsHash: ipfsHash
            })
          }
          console.log("lastsUriMints => result", lastsUriMints);
        } catch (error) {
          console.log("error", error);
        }          

        try {          
          const pinnedFiles = downloadListFromPinata();
          pinnedFiles.then(result => {
            console.log("pinnedFiles => result", result)
            lastsUriMints.forEach(tokenUri => {

            })
          })
        } catch (error) {
          console.log("error", error);
        }
      }
    }

    async function loadNfts () {  
      setLoading(true);    
      if (contract != null) {
        try {          
          const nftQuantity = await contract.idCounter();  
          let lastsUriMints: [{tokenId: number; tokenUri: string, owner: string }] = [{tokenId: -1, tokenUri: '', owner: ''}];
          let max = nftQuantity.toNumber();
          for(let i = max ; i > 0; i--) {             
            const uri = await contract.tokenURI(nftQuantity.toNumber()-i);
            const nftOwner = await contract.ownerOf(nftQuantity.toNumber()-1); 
            console.log("nftOwner", nftOwner);
            lastsUriMints.push({
              tokenId: nftQuantity.toNumber()-i, 
              tokenUri: uri,
              owner:nftOwner
            })            
          }
          
          let nfts: NftOrder[] = [];
          lastsUriMints.slice().reverse().forEach(token => {
            
            console.log("token", token);
            if (token.tokenId >= 0) {
              const metadata = downloadJsonFromPinata(ipfsGateway+token.tokenUri).then(result => {
                //console.log("result", result);        
                const activityJson = JSON.parse(result);
                let rewards:string = ""
                activityJson.attributes.forEach((attr: { trait_type: string; value: string; }) => {
                  if (attr.trait_type == 'Rewards')
                    rewards = attr.value;
                })
                const nftOwnerPromise = contract.ownerOf(nftQuantity.toNumber()-1); 
                const nftOwner = nftOwnerPromise.then(result => {return result.result});
                console.log("nftOwner", nftOwner);
                const nftOrder: NftOrder = 
                  {
                    owner: token.owner,
                    tokenId: token.tokenId,
                    name: activityJson.name,
                    description: activityJson.description,
                    image: ipfsGateway+activityJson.image,
                    status: 'Concluido',
                    attributes: 'Comunidade',
                    creatorActivity: 'Douglas',
                    tag: 'tag#3',
                    dateLimit: 'Dezembro',
                    bounty: parseInt(rewards),
                    difficulty: 'Avancado',
                  };
                nfts.push(nftOrder)
                console.log("nftOrder", nftOrder);
                if (token.tokenId == 0)
                  setLoading(false);         
              });                                          
            }            
          });  
          setData(nfts)
          console.log("nfts",nfts);
        } catch (error) {
          console.log("error", error)
          setLoading(false);
          return;
        }                       
      }
    }
  
    async function loadCheckAddress() {

      const { walletAddress } = useWalletAddress();
      const wallet = walletAddress();

      setLoading(true);
      if (contract != null) {
        try {          
          const leader:boolean = await contract.checkAddressLeader(wallet); 
          const member:boolean = await contract.checkAddressMember(wallet);  
          if(leader == true){
            setCheckLeader(true)
          }else{
            setCheckLeader(false)
          }
          if(member == true){
            setCheckMember(true)
          }else{  
            setCheckMember(false)
          }
          console.log('Address Account', wallet);
          console.log('Check Leader  = ', checkLeader);  
          console.log('Check Member  = ', checkMember);      
        } catch (error) {
          console.log("errors", error);
          }          
      }
    }    

    useEffect(() => {      
        loadNfts();
        loadLastNft();
        //loadListNfts();
        loadCheckAddress();
        balanceOf(process.env.REACT_APP_DAPP_CONTRACT);
    }, []);

    return { data, loading, counter, lastToken, balance, checkMember, checkLeader };
  }




  