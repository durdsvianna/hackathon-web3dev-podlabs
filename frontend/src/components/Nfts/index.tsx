import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

import { useContract, useSigner } from 'wagmi';
import { useIpfsUploader } from "src/utils/IpfsUtils"
import NftERC721Artifact from "src/contracts/NftERC721.json";
import contractAddress from "src/contracts/contract-nfterc721-address.json";

import { NftOrder } from 'src/models/nft_order';


export default function MediaNft() {
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
    <>
    <Box 
      sx={{
        marginTop: 4,
      }}>
      <Grid container spacing={2}>
        {activitiesData.map((nftData, index) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={nftData.image}
                title="Web3Dev Blockchain"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {nftData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {nftData.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
}