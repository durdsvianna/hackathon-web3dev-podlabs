import {
    Box,
    Typography,
    Card,
    CardHeader,
    Divider,
    Avatar,
    useTheme,
    styled,
    CardMedia,
    CardContent,
    Grid,
  } from '@mui/material';
  
  import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
  import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react';
  
  const AvatarPrimary = styled(Avatar)(
    ({ theme }) => `
        background: ${theme.colors.primary.lighter};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(7)};
        height: ${theme.spacing(7)};
  `
  );
  
  // TODO pegar quantidade total de NFTS de atividades completos
  // let completeActivity  = 10;
  // let totalBounty = 100; // DOLÁR
  
  function DetailsNft({data}) {
    const theme = useTheme();
  
    return (
      <Card>
          {data.map((nftData: { bounty: number; image: string; name: boolean | ReactChild | ReactFragment | ReactPortal; description: boolean | ReactChild | ReactFragment | ReactPortal; }, index: Key) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <CardHeader title={nftData.name} />
              <Divider />
              <Box px={2} py={4} display="flex" alignItems="flex-start">
                <Box pl={2} flex={1}>
                  <Typography variant="h3">Activity Description</Typography>
        
                  <Box pt={2} display="flex">
                    <Box pr={8}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        'TESTE'
                      </Typography>
                      <Typography variant="h2">{nftData.description}</Typography>
                    </Box>
        
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box px={2} py={4} display="flex" alignItems="flex-start">
      
        
                <Box pl={2} flex={1}>
                  <Typography variant="h3">Activity Bounty</Typography>
        
                  <Box pt={2} display="flex">
                    <Box pr={8}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Total
                      </Typography>
                      <Typography variant="h2">${nftData.bounty}</Typography>
                    </Box>
        
                  </Box>
                </Box>
              </Box>
        
              <Divider />

            </Grid>
          ))}        
      </Card>
    );
  }
  
  export default DetailsNft;
  