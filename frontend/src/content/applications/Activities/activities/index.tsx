import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Activities from './Activities';
import LastActivities from './LastActivities';

import { useErc721Contract } from "src/utils/Web3Erc721Utils"
import SuspenseLoader from 'src/components/SuspenseLoader';

function ApplicationsTransactions() {
  const { data, loading, lastToken, balance } = useErc721Contract();

  return (
    <>
      <Helmet>
        <title>Activities - Leader</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      {loading 
      ? <SuspenseLoader />
      : 
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <AccountBalance lastToken={lastToken} balance={balance}/>
            </Grid>
            <Grid item xs={12}>
              <LastActivities data={data}/>
            </Grid>
            <Grid item xs={12}>            
              <Activities data={data}/>
            </Grid>
          </Grid>
        </Container>
      }     
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
