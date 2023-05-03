import Footer from 'src/components/Footer';
import { Helmet } from 'react-helmet-async';

import { Grid, Container } from '@mui/material';

import AccountBalanceNft from 'src/components/Nfts/AccountBalanceNft';
import CreateMintNft from 'src/components/Nfts/CreateMintNft';
import LastActivityDisplayNft from 'src/components/Nfts/LastActivityDisplayNft';
import LastActivitiesNft from 'src/components/Nfts/LastActivitiesNft';
import MediaNft from 'src/components/Nfts/MediaNft';

import { useErc721Contract } from 'src/utils/Web3Erc721Utils';

function ActivityDetails() {
  const { data, loading, lastToken, balance} = useErc721Contract();

  return (
    <>
      <Helmet>
        <title>Activity Details - Member</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
          </Grid>          

          <Grid item xs={12} md={12}>
            <MediaNft data={data} loading={loading}/>
            <LastActivitiesNft data={data}/>
            <CreateMintNft/>
            <LastActivityDisplayNft lastToken={lastToken}/>
            <AccountBalanceNft balance={balance}/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ActivityDetails;
