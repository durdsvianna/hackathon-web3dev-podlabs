import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import MediaNft from 'src/components/Nfts';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Web3Dev Marketplace</title>
      </Helmet>
      <Container maxWidth="lg">
          <MediaNft/>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
