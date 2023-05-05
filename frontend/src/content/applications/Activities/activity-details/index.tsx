import Footer from 'src/components/Footer';
import { Helmet } from 'react-helmet-async';

import { Grid, Container, Card } from '@mui/material';

import ActivityDetailsNft from 'src/components/Nfts/ActivityDetailsNft';
import { useErc721Contract } from 'src/utils/Web3Erc721Utils';

function ActivityDetails() {
  const { data, loading } = useErc721Contract();
  const tokenId = localStorage.getItem('tokenId');
  console.log('tokenId = ', tokenId);

  return (
    <>
      <Helmet>
        <title>Activity Details - Member</title>
      </Helmet>
      <Container sx={{mt: 3}} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems='center'
          spacing={2}
        >

              <Grid item xs={12} md={12} >
                <ActivityDetailsNft data={data} loading={loading} nftId={tokenId}/>
              </Grid>    
              
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ActivityDetails;
