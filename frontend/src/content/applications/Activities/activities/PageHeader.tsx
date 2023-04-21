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
        <Typography variant="subtitle2">
        Hey! <Typography variant="h4" component="h4">{user.name}</Typography>, today's a good day to manage activities'! Today is <Typography variant="h4" component="h4">{dateBR}</Typography>. This is the wizard panel to create and mint your activities.
        </Typography> 
      </Grid>
    </Grid>
  );
}

export default PageHeader;
