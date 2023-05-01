import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  styled,
  Avatar,
  alpha,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { NftOrder } from 'src/models/nft_order';
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
  owner: '',
  tokenId: 0,
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

const AccountBalance = ({ lastToken, balance }) => {
  
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
