import {Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material';
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react';
import SuspenseLoader from 'src/components/SuspenseLoader';
import DetailsNft from 'src/content/applications/Activities/activity-details/detailsNft';

export default function ActivityDetailsNft({data, loading}) {

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
            <Grid item xs={12} key={index}>
                <Card sx={{ maxWidth: 1035, height: 700 }}>
                    <Grid spacing={0} container>

                        <Card sx={{ maxWidth: 1035 }}>
                            <CardMedia
                            sx={{ height: 420, width: 500 }}
                            image={nftData.image}
                            title="Web3Dev Blockchain"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {nftData.name}
                            </Typography>
                            </CardContent>
                        </Card>
                        <DetailsNft data={data}/>

                    </Grid>
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