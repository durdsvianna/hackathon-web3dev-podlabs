import { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import { NftOrder } from 'src/models/nft_order';
import ActivitiesTable from './ActivitiesTable';
import { useContract, useSigner } from 'wagmi';
import { useIpfsUploader } from "src/utils/IpfsUtils"
import NftERC721Artifact from "src/contracts/NftERC721.json";
import contractAddress from "src/contracts/contract-nfterc721-address.json";

function Activities() {
  const { data: signer, isError, isLoading } = useSigner();  
  const contractReadConfig = {
    addressOrName: contractAddress.NftERC721,
    contractInterface: NftERC721Artifact.abi,
  }                                            
  const contractConfig = {
    ...contractReadConfig,
    signerOrProvider: signer,
  }; 
  const contract = useContract(contractConfig);
  const { downloadJsonToPinata } = useIpfsUploader();
  const [activitiesData, setActivitiesData] = useState<NftOrder[]>([]);
  const [activitiesDataLoaded, setActivitiesDataLoaded] = useState<boolean>(false);

  const loadContractInfo = async () : Promise<NftOrder[]> => {
    //busca o tokenUri do ultimo nft mintado
    console.log("contract", contract);
    const nftQuantity = await contract.idCounter();  
    let lastsUriMints: [{tokenId: number; tokenUri: string }] = [{tokenId: 0, tokenUri: ''}];
    let max = nftQuantity;
    for(let i = max ; i >= 1; i--) {             
      const uri = await contract.tokenURI(nftQuantity.toNumber()-i);
      lastsUriMints.push({
        tokenId: nftQuantity.toNumber()-1, 
        tokenUri: uri
      })          
    }
    console.log("lastsUriMints", lastsUriMints);  
    let nfts: NftOrder[] = [];
    lastsUriMints.forEach(token => {
      console.log("token.tokenUri", token.tokenUri);
      if (token.tokenId > 0) {
        const metadata = downloadJsonToPinata(token.tokenUri).then(result => {
          console.log("result", result);        
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
          nfts.push(nftOrder);   
        });
      }      
    });    
    console.log("nfts", nfts);         
    setActivitiesDataLoaded(true);
    return nfts;    
  }

  useEffect(() => {
    //console.log("executed on changed setActivitiesData!");
    console.log("LastActivities => executed only once!");
    loadContractInfo().then(loadResult => {
      console.log("loadResult", loadResult);
      if (!activitiesDataLoaded)
        setActivitiesData(loadResult);
        console.log("activitiesData", activitiesData);    
    });    
  });

  return (
    <Card>
      <ActivitiesTable nfts={activitiesData} />
    </Card>
  );
}

export default Activities;
