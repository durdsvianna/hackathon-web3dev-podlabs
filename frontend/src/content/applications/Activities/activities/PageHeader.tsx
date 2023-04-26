import { useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import { useDateFormatter } from 'src/utils/DateUtils';
import { useShortenAddressOrEnsName } from 'src/utils/Web3Utils';

function PageHeader() {
  const { getFormattedDate, languageFormat, setLanguageFormat } = useDateFormatter('pt-BR');
  const { shortenAddressOrEnsName } = useShortenAddressOrEnsName();
  const [dateBR, setDateBR] = useState<string>("");

  const shortenedAddressOrName = shortenAddressOrEnsName();

  const user = {
    name: shortenedAddressOrName,
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3">
            Hello, {user.name}!
            <Typography variant="subtitle2">
            Today's a good day to create a new activity! 
            <Typography variant="h4" textAlign={'center'} component="h4">{dateBR} </Typography>
            This is the wizard panel to create and mint your activities.
            </Typography>      
          </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
