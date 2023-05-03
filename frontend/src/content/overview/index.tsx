import { Box, Container, styled} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import MediaNft from 'src/components/Nfts/MediaNft';
import { useErc721Contract } from 'src/utils/Web3Erc721Utils';
import Footer from 'src/components/Footer';

function Overview() {
  const { data, loading } = useErc721Contract();

  const OverviewWrapper = styled(Box)(
    () => `
      overflow: auto;
      flex: 1;
      overflow-x: hidden;
      align-items: center;
          `
  );
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Web3Dev Marketplace</title>
      </Helmet>
      <Container maxWidth="lg">
          <MediaNft data={data} loading={loading}/>
      </Container>
      <Footer />
    </OverviewWrapper>
  );
}

export default Overview;
