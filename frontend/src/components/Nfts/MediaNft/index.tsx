import {Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material';
import { Key, ReactChild, ReactFragment, ReactPortal, useState } from 'react';
import SuspenseLoader from 'src/components/SuspenseLoader';


export default function MediaNft({data, loading}) {

  const [id, setId] = useState('');
  const [tokenId, setTokenId] = useState(1024);
  console.log('TOKEN ID = ', tokenId);

  const handleButtonNftDetails = (tokenId) => {
    setTokenId(tokenId);
    localStorage.setItem('tokenId', tokenId);
    console.log('token id =================== ', tokenId)
    window.location.href = "/dapp/activity-details";
  }

    return (
      <>
      {console.log('STATUS LOADING MEDIA NFT INITIAL = ', loading)}
      {console.log('DATA NT MEDIA', data)}
      {!loading
      ?
      <Box 
        sx={{
          marginTop: 4,
        }}>
        <Grid container spacing={2}>
          {data.map((data, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={data.image}
                  title="Web3Dev Blockchain"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.description}
                  </Typography>
                  <Typography variant="h4" color="text.primary" align={'right'}>
                    Bounty ${data.bounty}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small" onClick={() => handleButtonNftDetails(data.tokenId)}>Activity Details</Button>
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