import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider,
    Button,
} from '@mui/material';
  
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

export default function UserEditPersonalDetails({user: UserProfile}) {

    function UserProfileSection(props) {
        const { label, value, xs, sm, md, textAlign } = props;
        
        return (
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={xs} sm={sm} md={md} textAlign={textAlign}>
                    <Box pr={2} py={1}>
                    <Typography variant="body1" color="textSecondary">{label}:</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12 - xs} sm={12 - sm} md={12 - md}>
                    <Box pr={2} py={1}>
                    <Typography variant="body1" color="textPrimary">{value}</Typography>
                    </Box>
                </Grid>
            </Grid>
        );
    }

    return(
    <Grid item xs={12}>
        <Card>
        <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Box>
            <Typography variant="h4" gutterBottom>
                Personal Details
            </Typography>
            <Typography variant="subtitle2">
                Manage informations related to your personal details
            </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
            Edit
            </Button>
        </Box>
        <Divider />
        <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">

            <UserProfileSection label="Nome" value={UserProfile.name} xs={12} sm={4} md={3} textAlign={{ sm: 'right' }} />
            <UserProfileSection label="Description" value={UserProfile.description} xs={12} sm={4} md={3} textAlign={{ sm: 'right' }} />
            <UserProfileSection label="Job Title" value={UserProfile.jobTitle} xs={12} sm={4} md={3} textAlign={{ sm: 'right' }} />
            <UserProfileSection label="Location" value={UserProfile.location} xs={12} sm={4} md={3} textAlign={{ sm: 'right' }} />
            <UserProfileSection label="Social" value={UserProfile.social} xs={12} sm={4} md={3} textAlign={{ sm: 'right' }} />

            </Typography>
        </CardContent>
        </Card>
    </Grid>
    )
}