import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useDateFormatter } from 'src/utils/DateUtils';
import { useShortenAddressOrEnsName } from 'src/utils/Web3Utils';

function PageHeader() {
  const { getFormattedDate, languageFormat, setLanguageFormat } = useDateFormatter('pt-BR');
  const { shortenAddressOrEnsName } = useShortenAddressOrEnsName();
  const [dateBR, setDateBR] = useState<string>("");
  //const { addressOrName, setAdderssOrName } = useState<string>("");
  
  const shortenedAddress = shortenAddressOrEnsName();

  
  const user = {
    name: shortenedAddress,
    avatar: '/static/images/avatars/1.jpg'
  };

  if (dateBR.length <= 0){
    if (languageFormat != 'pt-BR') {
      setLanguageFormat('pt-BR');
      console.log("getFormattedDate", getFormattedDate(new Date()))
      setDateBR(getFormattedDate(new Date()));
    }
    else {
      setDateBR(getFormattedDate(new Date()));
    }
  }

  return (
    <>
      <Box>        
        <Typography variant="subtitle2">
        Hey! <Typography variant="h4" component="h4">{user.name}</Typography>, today's a good day to create a new activity! Today is <Typography variant="h4" component="h4">{dateBR}</Typography>. This is the wizard panel to create and mint your activities.
        </Typography>      
      </Box>      
    </>
  );
}

export default PageHeader;
