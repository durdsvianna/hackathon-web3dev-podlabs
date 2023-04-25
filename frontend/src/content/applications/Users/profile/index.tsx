import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';

import { User } from 'src/models/user';
import { useShortenAddressOrEnsName } from 'src/utils/Web3Utils';

function ManagementUserProfile() {

  const { shortenAddressOrEnsName } = useShortenAddressOrEnsName();
  const shortenedAddressOrName = shortenAddressOrEnsName();

  const user : User= {
    name: shortenedAddressOrName,
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description: "Description Profile",
    jobTitle: 'Web Developer',
    location: 'Barcelona, Spain',
    social: '465',
  };
  
  return (
    <>
      <Helmet>
        <title>Web3Dev User Profile</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
