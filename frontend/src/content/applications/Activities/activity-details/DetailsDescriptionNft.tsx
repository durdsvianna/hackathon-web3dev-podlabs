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

function DetailsDescriptionNft({ data, loading, nftId }) {
  const theme = useTheme();

  return (
    <>
    {!loading ? 
      <Grid item xs={12} sm={6} md={6} lg={6}>
      {data[nftId] && (
          <Card sx={{ ml: 4 }}>
            <CardHeader title={data[nftId].name} />
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
                      Details
                    </Typography>

                    <Typography variant="h2">{data[nftId].description}</Typography>
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
                    <Typography variant="h2">${data[nftId].bounty}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider />
          </Card>
        )}
      </Grid>
  : <div>Error Loading</div>  
  }
    </>
  );
}

export default DetailsDescriptionNft;
