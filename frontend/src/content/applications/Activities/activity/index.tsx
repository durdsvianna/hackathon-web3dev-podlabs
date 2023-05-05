import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from 'src/components/RecentActivity';
import UserProfile  from 'src/components/User/UserProfile';
import { useErc721Contract } from 'src/utils/Web3Erc721Utils';
import CompleteActivityNft from 'src/components/Nfts/CompleteActivityNft';

function ManagementActivity() {
  const { data, loading } = useErc721Contract();
  const user = UserProfile();

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
            <ProfileCover user={user} />
          </Grid>          

          <Grid item xs={12} md={12}>
            <CompleteActivityNft data={data} loading={loading} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementActivity;
