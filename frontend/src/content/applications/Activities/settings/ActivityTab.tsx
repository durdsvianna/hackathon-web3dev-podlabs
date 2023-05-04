import { useState, forwardRef, useCallback, SetStateAction } from 'react';
import {useDropzone} from 'react-dropzone';
import bgimage from 'src/images/image.svg';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  Box,
  TextField,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  Divider,
  Button,
  CardActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Dayjs } from 'dayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { useIpfsUploader } from "src/utils/IpfsUtils"
import { useDateFormatter } from 'src/utils/DateUtils';

import { useContract, useAccount, useEnsName, useSigner } from 'wagmi';
import NftERC721Artifact from "src/contracts/NftERC721.json";
import contractAddress from "src/contracts/contract-nfterc721-address.json";
import UserProfile  from 'src/components/User/UserProfile';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(48)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    );
  },
);

const activityInitialStatus = [
  {
    value: '1',
    label: 'Initial State'
  },
  {
    value: '2',
    label: 'Scheduled'
  }
];
const activityDificulties = [
  {
    value: '1',
    label: 'Common'
  },
  {
    value: '2',
    label: 'Normal'
  },
  {
    value: '3',
    label: 'Complex'
  }
];

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const schema = yup.object({
  title: yup.string().required('Campo obrigatório.'),
  description: yup.string().required('Campo obrigatório.'),
}).required();

function ActivityTab() {

  const user = UserProfile();
  const creator = user.name;
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [openInformartion, setOpenInformartion] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [valueReward, setValueReward] = useState<Number>(0);
  const [activityStatus, setActivityStatus] = useState('');
  const [activityDificulty, setActivityDificulty] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [expireDate, setExpireDate] = useState<DatePickerProps<Dayjs> | null>(null);
  const [imageCover , setImageCover] = useState(bgimage);
  const [image , setImage] = useState<string | ArrayBuffer>();
  const [imageFile , setImageFile] = useState<File>();
  const [url , setUrl] = useState('src/images/image.svg');
  const [uriMetadata , setUriMetadata] = useState({});
  const [toAddress , setToAddress] = useState('');
  const [imageCoverLoaded , setImageCoverLoaded] = useState(false);
  const { data: signer, isError, isLoading } = useSigner();
  const [ nft, setNft] = useState({
    name: '',
    description: '',
    image: '',
    external_url: process.env.REACT_APP_ERC721_METADATA_EXTERNAL_LINK,
    background_color: '',
    animation_url: '',
    youtube_url: '',
    attributes: []
  });  
  const { getFormattedDate, languageFormat, setLanguageFormat } = useDateFormatter('pt-BR');
  const { uploadToInfura, uploadFileToPinata, uploadJsonToPinata, uploadFileResult, setUploadFileResult, uploadJsonResult, setUploadJsonResult } = useIpfsUploader();
  const contractReadConfig = {
    addressOrName: contractAddress.NftERC721,
    contractInterface: NftERC721Artifact.abi,
  }
  const contractConfig = {
    ...contractReadConfig,
    signerOrProvider: signer,
  };

  const contract = useContract(contractConfig);
  const mintNft = async (tokenUri, to) => {
    //realiza o mint da NFT          
    const mintResult = contract.safeMint(to, tokenUri);
    console.log("mintResult", mintResult);    
      
    return mintResult ? "NFT minted with success!" : "Error! NFT NOT minted!";
  }  

  const onSubmit = async(event: { preventDefault: () => void; }) => {
    nft.attributes = [...nft.attributes,{
      trait_type: 'Expire Date',
      value: expireDate
    }];
    
    nft.attributes = [...nft.attributes,{
      trait_type: 'Rewards',
      value: valueReward
    }];

    nft.attributes = [...nft.attributes,{
      trait_type: 'Creator',
      value: creator
    }];

    //armazena imagem IPS
    try {
      const ipfsImageResult = await uploadFileToPinata(imageFile);        
      setUploadFileResult(ipfsImageResult); 
      nft.image = ipfsImageResult.IpfsHash.toString();      
      console.log("ipfsImageResult", ipfsImageResult); 
      console.log("expireDate", expireDate);    
      console.log('Creator Activity Address', creator)
    } catch (error) {
      setOpenError(true);
      console.log("Erro: ", error);
    }    

    //guarda metadata no ipfs e realiza o mint
    try {
      const ipfsJsonResult = await uploadJsonToPinata(JSON.stringify(nft), "tokenUri.json");        
      setUploadJsonResult(ipfsJsonResult); 
      mintNft(ipfsJsonResult.IpfsHash, process.env.REACT_APP_DAPP_CONTRACT);
      setOpenInformartion(true);
    } catch (error) {
      console.log("Erro: ", error);
    }
  };

  const handleCloseSnackInformation = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenInformartion(false);
  };

  const handleCloseSnackError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
    nft.name = event.target.value;
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
    nft.description = event.target.value;
  };

  const handleChangeStatus = (event) => {
    setActivityStatus(event.target.value);
    nft.attributes = [...nft.attributes,{
      trait_type: 'Status',
      value: event.target.value
    }];
  };

  const handleChangeDificulty = (event) => {
    setActivityDificulty(event.target.value);
    nft.attributes = [...nft.attributes,{
      trait_type: 'Dificulty',
      value: event.target.value
    }];
  };
  const handleChangeReward = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value); 
    setValueReward(value);
  };

  const onDrop = useCallback(async(acceptedFiles) => {
      const file = acceptedFiles[0]
      let reader = new FileReader()
      setImageFile(file);        
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImage(reader.result);
        setUrl(URL.createObjectURL(file));
        console.log("url", url);    
      }
      setImageCoverLoaded(true);          
  } , [setImageFile]
  );

  const {getRootProps , getInputProps , open} = useDropzone({onDrop , 
    maxFiles:1 , 
    accept : {'image/*' : []} ,
    noClick : true ,
    noKeyboard : true}
  );

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openInformartion} autoHideDuration={6000} onClose={handleCloseSnackInformation}>
        <Alert onClose={handleCloseSnackInformation} severity="info" sx={{ width: '100%' }}>
          Mint process initiated!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseSnackError}>
        <Alert onClose={handleCloseSnackError} severity="error" sx={{ width: '100%' }}>
          Activity not minted! Try again!
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader title="Create activity and mint your NFT." />
        <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1 }
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div  {...getRootProps({className :'md:h-52 sm:h-44 h-auto bg-light-grey border-2 border-light-blue border-dashed rounded-md'})}>
          <CardCover >
            <CardMedia
              sx={{ minHeight: 280 }}
              image={imageCoverLoaded ? url : imageCover}
              title="Activity NFT"
            />      
            <CardCoverAction>
              <input {...getInputProps({name : 'image'})} id="change-cover" multiple />
              <p className='text-slate-400 md:text-md text-center mt-4 text-sm'>Drag & Drop your image here</p>
              <label htmlFor="change-cover">
                <Button
                  startIcon={<UploadTwoToneIcon />}
                  variant="contained"
                  component="span"
                >
                  Change image
                </Button>
              </label>
            </CardCoverAction>
          </CardCover> 
        </div>
            
        <Box p={3}>
          <Typography variant="h2" sx={{ pb: 1 }}>
            Create your activity quickly and easily
          </Typography>
        </Box>
        <Divider />
        <CardActionsWrapper
          sx={{
            display: { xs: 12, md: 3 },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1 }
            }}            
          >
            <div>
              <TextField fullWidth {...register("title")}                
                id="outlined-required"
                label="Title"
                onChange={handleChangeTitle}
                placeholder="Title"
              />
              <p>{errors.title?.message}</p>
            </div>
            <div>
              <TextField fullWidth {...register("description")}                
                id="outlined-required"
                label="Description"
                onChange={handleChangeDescription}
                placeholder="A full description about the ativity."
                multiline
                rows="6"
                maxRows="18"
              />
              <p>{errors.description?.message}</p>
            </div>                   
            <div>        
              <DatePicker
                label="Expire Date"
                value={expireDate}
                onChange={(newValue) => setExpireDate(newValue)}
              />      
              <TextField
                id="outlined-select-currency-native"
                select
                label="Status of activity"
                value={activityStatus}
                onChange={handleChangeStatus}
                SelectProps={{
                  native: true
                }}
              >
              {activityInitialStatus.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              </TextField>

              <TextField
                id="outlined-select-currency-native"
                select
                label="Dificulty of activity"
                value={activityDificulty}
                onChange={handleChangeDificulty}
                SelectProps={{
                  native: true
                }}
              >
              {activityDificulties.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              </TextField>

              <TextField 
                id="outlined-required"
                label="Creator"
                disabled
                value={creator}
              />  
              <TextField {...register("valueReward")}
                  label="Reward ($)"
                  value={valueReward}
                  onChange={handleChangeReward}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                />
              <p>{errors.valueReward?.message}</p>            
            </div>          
          </Box>
        </CardActionsWrapper>
        <CardActionsWrapper
          sx={{
            display: { xs: 'block', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >        
          <Box>
            
          </Box>
          <Box sx={{ mt: { xs: 2, md: 0 } }}>
            <Button type="submit" variant="contained">
              Create Activity
            </Button>
          </Box>
        </CardActionsWrapper>
        </Box>        
      </Card>
    </Stack>    
  );
}

export default ActivityTab;
