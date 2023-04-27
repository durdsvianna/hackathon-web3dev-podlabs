import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { BigNumber, ethers } from 'ethers';
import { useContractRead, useContract, useAccount, useEnsName, useSigner } from 'wagmi';
import NftERC721Artifact from "src/contracts/NftERC721.json";
import contractAddress from "src/contracts/contract-nfterc721-address.json";
import { useIpfsUploader } from "src/utils/IpfsUtils"
import { NftOrder } from 'src/models/nft_orders';
const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
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

const nftDefault : NftOrder = {
  name: 'nft-name',
  description: 'nft-description',
  image: '/static/images/nfts/nft-blockchain-web3dev.png',
  status: 'Concluido',
  attributes: 'Comunidade',
  creatorActivity: 'Douglas',
  tag: 'tag#3',
  dateLimit: 'Dezembro',
  bounty: 4,
  difficulty: 'Avancado',
}

const AccountBalance = () => {
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
  const { data: accountData } = useAccount();
  const { downloadJsonToPinata } = useIpfsUploader();
  const [activityData, setActivityData] = useState<NftOrder>(nftDefault);
  const [balance, setBalance] = useState<string>(" ");
  
  const loadContractInfo = async ()  => {
    console.log("contract in AccountBalance =>", contract);
    //busca o tokenUri do ultimo nft mintado            
    const tokenUriResult = await contract.lastMinted();      
    
    const metadata = downloadJsonToPinata(tokenUriResult).then(result => {        
        return result;        
      });
    
    metadata.then(resultMetadata => {
      const activityJson = JSON.parse(resultMetadata);
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
          bounty: 4,
          difficulty: 'Avancado',
        }; 
      console.log("nftOrder", nftOrder);
      if (activityData.name === 'nft-name' )
        setActivityData(nftOrder);
    })

    let balancePromise = contract.balanceOf(accountData.address);    
    balancePromise.then(result => {        
        setBalance(ethers.utils.formatEther(result));
      });
  
    console.log("balance", balance);
    console.log("activityData", activityData);
  }

  useEffect(() => {
    console.log("executed only once!");
    //setActivityData(getActivityData());
    
    loadContractInfo();
  } );
  
  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              NFT Account Balance
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                {balance}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
              >
                1.0045983485234 BTC
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4
                }}
                alignItems="center"
              >
                <AvatarSuccess
                  sx={{
                    mr: 2
                  }}
                  variant="rounded"
                >
                  <TrendingUp fontSize="large" />
                </AvatarSuccess>
                <Box>
                  <Typography variant="h4">+ $3,594.00</Typography>
                  <Typography variant="subtitle2" noWrap>
                    this month
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid sm item>
                <Button fullWidth variant="outlined">
                  Send
                </Button>
              </Grid>
              <Grid sm item>
                <Button fullWidth variant="contained">
                  Receive
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box p={4} sx={{
                  width: '94%'
                }}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Last activity created
            </Typography>
            <Card >
              <CardMedia
                sx={{ height: 180 }}
                image={activityData && activityData.image}
                title="Web3Dev Blockchain"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {activityData && activityData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activityData && activityData.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Box>          
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
