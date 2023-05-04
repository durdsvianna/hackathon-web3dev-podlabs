import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from 'src/components/RecentActivity';
import UserProfile  from 'src/components/User/UserProfile';

function ManagementActivity() {
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
            <RecentActivity/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementActivity;
