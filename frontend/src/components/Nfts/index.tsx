import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

import { NftOrder } from 'src/models/nft_orders';


export default function MediaNft() {
  
  const nftOrder: NftOrder[] = [
    {
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
    },
    {
      name: 'nft-name2',
      description: 'nft-description2',
      image: '/static/images/nfts/nft-blockchain-web3dev.png',
      status: 'Concluido',
      attributes: 'Comunidade',
      creatorActivity: 'Douglas',
      tag: 'tag#3',
      dateLimit: 'Dezembro',
      bounty: 4,
      difficulty: 'Avancado',
    },    
    {
      name: 'nft-name3',
      description: 'nft-description',
      image: '/static/images/nfts/nft-blockchain-web3dev.png',
      status: 'Concluido',
      attributes: 'Comunidade',
      creatorActivity: 'Douglas',
      tag: 'tag#3',
      dateLimit: 'Dezembro',
      bounty: 4,
      difficulty: 'Avancado',
    },
    {
      name: 'nft-name4',
      description: 'nft-description2',
      image: '/static/images/nfts/nft-blockchain-web3dev.png',
      status: 'Concluido',
      attributes: 'Comunidade',
      creatorActivity: 'Douglas',
      tag: 'tag#3',
      dateLimit: 'Dezembro',
      bounty: 4,
      difficulty: 'Avancado',
    },
    {
      name: 'nft-name5',
      description: 'nft-description',
      image: '/static/images/nfts/nft-blockchain-web3dev.png',
      status: 'Concluido',
      attributes: 'Comunidade',
      creatorActivity: 'Douglas',
      tag: 'tag#3',
      dateLimit: 'Dezembro',
      bounty: 4,
      difficulty: 'Avancado',
    },
    {
      name: 'nft-name6',
      description: 'nft-description2',
      image: '/static/images/nfts/nft-blockchain-web3dev.png',
      status: 'Concluido',
      attributes: 'Comunidade',
      creatorActivity: 'Douglas',
      tag: 'tag#3',
      dateLimit: 'Dezembro',
      bounty: 4,
      difficulty: 'Avancado',
    }
  ]

  return (
    <>
    <Box 
      sx={{
        marginTop: 4,
      }}>
      <Grid container spacing={2}>
        {nftOrder.map((nftData, index) => (
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