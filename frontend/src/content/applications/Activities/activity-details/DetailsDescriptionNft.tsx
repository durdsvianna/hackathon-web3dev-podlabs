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

import { Key, ReactChild, ReactFragment, ReactPortal } from 'react';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.primary.lighter};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(7)};
        height: ${theme.spacing(7)};
  `
);

function DetailsDescriptionNft({ data, nftId }) {
  const theme = useTheme();

  return (
    <>
      <Grid item xs={12} sm={6} md={6} lg={4}>
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

    </>
  );
}

export default DetailsDescriptionNft;
