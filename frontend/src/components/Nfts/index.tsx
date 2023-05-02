import {Card, CardActions, CardActionArea, CardContent, CardMedia, Button,Tooltip, Typography, Box, Grid, Avatar, styled, alpha} from '@mui/material';
import { AddTwoTone, TrendingUp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useShortenAddressOrEnsName } from 'src/utils/Web3Utils';

const handleButtonCreateActivity = () => {
  window.location.href = "/dapp/activity-settings";
};

export function MediaNft({data, loading}) {

  return (
    <>
    {!loading
    ?
    <Box 
      sx={{
        marginTop: 4,
      }}>
      <Grid container spacing={2}>
        {data.map((nftData, index) => (
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
    :
    <SuspenseLoader />
    }
    
    </>
  );
}

export function LastActivitiesNft({ data }) {  

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

    const { shortenAddressOrEnsName } = useShortenAddressOrEnsName();
    const shortenedAddressOrName = shortenAddressOrEnsName(); 
    const [sliceData, setSliceData] = useState([]);

    useEffect(() => {
        console.log("slicing data..")
        //const sData = [...data]; // spreading will return a new array
        setSliceData(data.slice(0,3));
        console.log("slice data (0,3) = ", sliceData);
      }, [])

    return(
      <>
        {        
        sliceData.map((nftData, index) => (
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
    
      </>
    );
  }

export function CeateNftMint() {
  
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
    
  return(
    <>            
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
                      <AddTwoTone fontSize="large" />
                    </AvatarAddWrapper>
                  </CardContent>
                </CardActionArea>
              </CardAddAction>
            </Tooltip>
          </Grid>      
    </>
  );
}

export function LasActivityNftDisplay( {lastToken}) {

  const handleButtonActivityDetails = () => {
    window.location.href = "/dapp/activity-details";
  };
  
  return(
    <>
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
              image={lastToken && lastToken.image}
              title="Web3Dev Blockchain"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {lastToken && lastToken.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {lastToken && lastToken.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small" onClick={handleButtonActivityDetails}>Activity Details</Button>
            </CardActions>
          </Card>
        </Box>          
      </Grid>    
    </>

  );
}

export function AccountBalanceNft({ balance }){
  
  const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.success};
  `
  );
  
  return(
    <>
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
    </>
  );
}