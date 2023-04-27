import {useState, useEffect } from 'react';
import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { NftOrder } from 'src/models/nft_orders';
import { useShortenAddressOrEnsName } from 'src/utils/Web3Utils';
import { useContract, useSigner } from 'wagmi';
import { useIpfsUploader } from "src/utils/IpfsUtils"
import NftERC721Artifact from "src/contracts/NftERC721.json";
import contractAddress from "src/contracts/contract-nfterc721-address.json";


const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name}`
  };
}

function LastActivities() {  
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
  const { shortenAddressOrEnsName } = useShortenAddressOrEnsName();
  const { downloadJsonToPinata } = useIpfsUploader();
  const [activitiesData, setActivitiesData] = useState<NftOrder[]>([]);
  const [activitiesDataLoaded, setActivitiesDataLoaded] = useState<boolean>(false);
  const shortenedAddressOrName = shortenAddressOrEnsName(); 

  const handleButtonCreateActivity = () => {
    window.location.href = "/dapp/activity-settings";
  };

  const loadContractInfo = async () : Promise<NftOrder[]> => {
    //busca o tokenUri do ultimo nft mintado
    console.log("contract", contract);
    const nftQuantity = await contract.idCounter();  
    let lastsUriMints = [];
    let max = nftQuantity > 3 ? 3 : nftQuantity
    for(let i = max ; i >= 1; i--) {                
      lastsUriMints.push(await contract.tokenURI(nftQuantity.toNumber()-i))          
    }
    console.log("lastsUriMints", lastsUriMints);  
    let nfts: NftOrder[] = [];
    lastsUriMints.forEach(tokenUri => {
      console.log("tokenUri", tokenUri);
      const metadata = downloadJsonToPinata(tokenUri).then(result => {
        console.log("result", result);        
        return result;        
      });
      console.log("metadata", metadata);
      metadata.then(resultMetadata => {
        const activityJson = JSON.parse(resultMetadata);
        let rewards:string = ""
        activityJson.attributes.forEach(attr => {
          if (attr.trait_type == 'Rewards')
            rewards = attr.value;
        })
        const nftOrder: NftOrder = 
          {
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
      })            
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
        display="flex"
        alignItems="center"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">Recent Activities</Typography>
        <Button sx={{ ml: 2 }}
          size="small"
          variant="outlined"
          onClick={handleButtonCreateActivity}
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create Activity
        </Button>
      </Box>
      <Grid container spacing={3}> 
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Click to add a new activity">
            <CardAddAction onClick={handleButtonCreateActivity}>
              <CardActionArea
                sx={{
                  px: 1
                }}
              >
                <CardContent>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon fontSize="large" />
                  </AvatarAddWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
        {activitiesData && activitiesData.map((nftData, index) => (
          <Grid xs={12} sm={6} md={3} item key={index}>
            <Card
              sx={{
                px: 1
              }}
            >
              <CardContent>
                <Avatar variant="rounded" {...stringAvatar(shortenedAddressOrName)} />
                <Typography variant="h5" noWrap>
                  {nftData.name}
                </Typography>
                <Typography variant="subtitle1" noWrap>
                {nftData.description}
                </Typography>
                <Box
                  sx={{
                    pt: 3
                  }}
                >
                  <Typography variant="h3" gutterBottom noWrap>
                    Bounty ${nftData.bounty}
                  </Typography>
                  <Typography variant="subtitle2" noWrap>
                    {nftData.status}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}              
      </Grid>
    </>
  );
}

export default LastActivities;
