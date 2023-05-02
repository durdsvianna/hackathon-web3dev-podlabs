import { Card, Grid } from '@mui/material';
import { AccountBalanceNft, LasActivityNftDisplay } from 'src/components/Nfts';

const AccountBalance = ({ lastToken, balance }) => {
  
  return (
    <Card>
      <Grid spacing={0} container>
        <AccountBalanceNft balance={balance}/>
        <LasActivityNftDisplay lastToken={lastToken}/>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
