import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
} from '@mui/material';

import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

// TODO pegar quantidade total de NFTS de atividades completos
let completeActivity  = 10;
let totalBounty = 100; // DOLÁR

function RecentActivity() {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Atividades NFTs" />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <ShoppingBagTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Atividades</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Concluidas
              </Typography>
              <Typography variant="h2">{completeActivity}</Typography>
            </Box>

          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <AttachMoneyIcon />
        </AvatarPrimary>

        <Box pl={2} flex={1}>
          <Typography variant="h3">Bounty</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total
              </Typography>
              <Typography variant="h2">${totalBounty}</Typography>
            </Box>

          </Box>
        </Box>
      </Box>

      <Divider />
    </Card>
  );
}

export default RecentActivity;
