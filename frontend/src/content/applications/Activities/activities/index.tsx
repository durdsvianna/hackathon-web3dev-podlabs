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
import { useEffect } from 'react';

function ApplicationsActivities() {
  const { data, loading, lastToken, balance, setLoading } = useErc721Contract();

  useEffect(() => {
    return () => {
      setLoading(false);
    }
  },[])
  return (
    <>
      <Helmet>
        <title>Web3Dev - Activities</title>
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

export default ApplicationsActivities;
