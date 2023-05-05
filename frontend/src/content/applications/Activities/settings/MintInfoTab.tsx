import { useState, MouseEvent, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  TextField,
  ListItemAvatar,
  Avatar,
  Switch,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  styled,
} from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { format, subHours, subWeeks, subDays } from 'date-fns';
import { useContractApprovementActivity } from "src/utils/Web3Erc721Utils"
const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

const AvatarFired = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.error.light};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

const activityStatusList = [
  {
    value: '3',
    label: 'Approved'
  },
  {
    value: '4',
    label: 'Not Approved'
  }
];

const schema = yup.object({
  status: yup.string().required('Campo obrigatório.'),
}).required();


function MintInfoTab({data}) {
  const theme = useTheme();
  const [activityStatus, setActivityStatus] = useState('Select');
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {loading, setLoading, errors, approveActivityMultisig } = useContractApprovementActivity();
  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSubmit = async(event: { preventDefault: () => void; }) => {
    console.log("ENTROU NO SUBMIT")
    //se aprovada inicia processo multisig
    console.log("activityStatus", activityStatus)
    if (activityStatus == '3'){
      approveActivityMultisig(data.owner, data.tokenId);
    }
    else{
      //se nao, atualiza status para "Available"
    }
    
  };

  const handleChangeStatus = (event) => {
    console.log("ENTROU NO HANDLE CHANGE STATUS")
    setActivityStatus(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">{data && data.name}</Typography>
          <Typography variant="subtitle2">
            {data && data.owner}
          </Typography>
        </Box>
        <Card>
          <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1 }
              }}              
          >
            <List>
              <ListItem sx={{ p: 3 }}>
                <ListItemAvatar sx={{ pr: 2 }}>
                  <AvatarSuccess>
                    <DoneTwoToneIcon />
                  </AvatarSuccess>
                </ListItemAvatar>
                <ListItemText>
                <TextField sx={{ pr: 2 }}
                  id="outlined-select-currency-native"
                  select
                  fullWidth
                  label='Status of activity'
                  value={data && data.status ? data.status : activityStatus}
                  onChange={handleChangeStatus}
                  SelectProps={{
                    native: true
                  }}
                >
                  <option key="0" value="Select">
                    Select
                  </option>
                {activityStatusList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
                </TextField>
                </ListItemText>
                <Button onClick={onSubmit} size="large" variant="contained">
                  Confirm
                </Button>
              </ListItem>
            </List>
          </Box>          
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar sx={{ pr: 2 }}>
                <AvatarFired>
                  <LocalFireDepartmentIcon />
                </AvatarFired>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Burn Activity"
                secondary="The activity will be deleted and NFT burned."
              />
              <ButtonError size="large" variant="contained">
                Burn activity
              </ButtonError>
            </ListItem>
          </List>
        </Card>
      </Grid>            
    </Grid>
  );
}

export default MintInfoTab;
