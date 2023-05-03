import {Card, CardActions, CardActionArea, CardContent, CardMedia, Button,Tooltip, Typography, Box, Grid, Avatar, styled, alpha} from '@mui/material';
import { AddTwoTone, TrendingUp } from '@mui/icons-material';
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useShortenAddressOrEnsName } from 'src/utils/Web3Utils';

export default function MediaNft({data, loading}) {

    return (
      <>
      {console.log('STATUS LOADING MEDIA NFT INITIAL = ', loading)}
      {!loading
      ?
      <Box 
        sx={{
          marginTop: 4,
        }}>
        <Grid container spacing={2}>
          {data.map((nftData: { image: string; name: boolean | ReactChild | ReactFragment | ReactPortal; description: boolean | ReactChild | ReactFragment | ReactPortal; }, index: Key) => (
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