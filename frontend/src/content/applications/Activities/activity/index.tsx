import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';
import UserProfile  from 'src/components/User/UserProfile';
import { useErc721Contract } from 'src/utils/Web3Erc721Utils';
import CompleteActivityNft from 'src/components/Nfts/CompleteActivityNft';

function ManagementActivity() {
  const { data, loading } = useErc721Contract();
  const user = UserProfile();

  const tokenId = '1' // TO DO Pegar TokenID do contrato e setar direto no useErc721Contract() como activityOwner
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
            <CompleteActivityNft user={user} data={data} loading={loading} nftId={tokenId} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementActivity;
