import {Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material';
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react';
import SuspenseLoader from 'src/components/SuspenseLoader';

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
          {data.map((nftData: { bounty: number; image: string; name: boolean | ReactChild | ReactFragment | ReactPortal; description: boolean | ReactChild | ReactFragment | ReactPortal; }, index: Key) => (
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
                  <Typography variant="h4" color="text.primary" align={'right'}>
                    Bounty ${nftData.bounty}
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