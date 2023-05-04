import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useState } from 'react';
import { useIpfsUploader } from 'src/utils/IpfsUtils';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
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

const ProfileCover = ({ user: UserProfile }) => {

  const { uploadFileToPinata, uploadFileResult, setUploadFileResult, uploadJsonResult, setUploadJsonResult, uploadJsonToPinata } = useIpfsUploader();

  const [cover, setCover] = useState(UserProfile.coverImg);
  const [avatar, setAvatar] = useState(UserProfile.avatar);
  const [url , setUrl] = useState('src/images/image.svg');
  const [imageFile , setImageFile] = useState<File | null>(null);

  const [profile, setProfile] = useState({
    name: '',
    coverImg: cover,
    avatar: '/static/images/avatars/4.jpg',
    description: "Description Profile",
    jobTitle: 'Web Developer',
    location: 'Barcelona, Spain',
    social: '465',
  });

  const onSubmit = async (event: { preventDefault: () => void }) => {
    try {
      const ipfsImageResult = await uploadFileToPinata(imageFile);
      setUploadFileResult(ipfsImageResult);
      setCover(ipfsImageResult.IpfsHash.toString());
  
      const ipfsJsonResult = await uploadJsonToPinata(JSON.stringify(url), "image-info.json");
      setUploadJsonResult(ipfsJsonResult);
  
      setProfile((prevProfile) => {
        return {
          ...prevProfile,
          coverImg: ipfsImageResult.IpfsHash.toString()
        };
      });
      console.log("ipfsImageResult", ipfsImageResult.IpfsHash);
    } catch (error) {
      console.log("Erro: ", error);
    }
  };
  

  const handleChangeCover = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUrl(imageUrl);
      setImageFile(file);
    }
    
    const ipfsJsonResult = await uploadJsonToPinata(JSON.stringify(profile.coverImg), "User Image");        
    setUploadJsonResult(ipfsJsonResult);
    console.log('ipfsJson', ipfsJsonResult);
  };

  const handleChangeAvatar = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleButtonHome = () => {
    window.location.href = "/dapp/#";
  };

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }} onClick={handleButtonHome}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Bem-vindo {UserProfile.name}
          </Typography>
          <Typography variant="subtitle2">
            Perfil do usuário {UserProfile.name}
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image={cover} />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" onChange={handleChangeCover}/>
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
              onChange={handleChangeCover}
            >
              Modificar papel de parede
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={UserProfile.name} src={avatar} />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
            onChange={handleChangeAvatar}
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {UserProfile.name}
        </Typography>
        <Typography variant="subtitle2">{UserProfile.description}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {UserProfile.jobTitle} | {UserProfile.location} |
        </Typography>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
              <IconButton>
                <GitHubIcon/>
              </IconButton>

            <IconButton>
              <InstagramIcon/>
            </IconButton>

            <IconButton color="primary" sx={{ p: 0.5 }}>
              <MoreHorizTwoToneIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
