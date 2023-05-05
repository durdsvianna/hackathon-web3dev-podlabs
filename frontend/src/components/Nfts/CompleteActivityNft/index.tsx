import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@mui/material';
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react';
import SuspenseLoader from 'src/components/SuspenseLoader';
// import ActivityExpansiveDescriptionDetailsNft from '../ActivityExpansiveDescriptionDetailsNft';
// import ActivityExpansiDetailsNft from './'
export default function CompleteActivityNft({ data, loading }) {

  return (
    <>
        <Box
          sx={{
            marginTop: 4,
            width: 1,
          }}>
          <Grid container spacing={10}>
            <Button></Button>
            {/* <ActivityExpansiveDescriptionDetailsNft />
            <ActivityExpansiveDescriptionDetailsNft /> */}
          </Grid>
        </Box>
        <SuspenseLoader />
      <Button></Button>
    </>
  );
}
