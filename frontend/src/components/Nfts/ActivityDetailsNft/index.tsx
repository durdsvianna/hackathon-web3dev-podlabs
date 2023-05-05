import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material';
import SuspenseLoader from 'src/components/SuspenseLoader';
import DetailsDescriptionNft from 'src/content/applications/Activities/activity-details/DetailsDescriptionNft';

export default function ActivityDetailsNft({ data, loading, nftId}) {


  return (
    <>
      {console.log('STATUS LOADING MEDIA NFT INITIAL = ', loading)}
      {console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa = ', data)}

      {!loading
        ?
        <Box
          sx={{
            marginTop: 4,
            width: 1,
          }}>
          <Grid container spacing={10}>
              <Grid item xs={12} >
                <Card sx={{ maxWidth: 1, height: 1}}>
                  <Grid spacing={0} container>

                    <Card sx={{ maxWidth: 1035 }}>
                    {data[nftId] && data[nftId].image && (
                      <><CardMedia
                        sx={{ height: 420, width: 500 }}
                        image={data[nftId].image}
                        title="Web3Dev Blockchain" /><CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {data[nftId].name}
                          </Typography>
                        </CardContent></>
                      )}

                    </Card>
                    <DetailsDescriptionNft data={data} loading={loading} nftId={nftId} />

                  </Grid>
                </Card>
              </Grid>
          </Grid>
        </Box>
        :
        <SuspenseLoader />
      }

    </>
  );
}