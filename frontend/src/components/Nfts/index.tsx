import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

import { useErc721Contract } from "src/utils/Web3Erc721Utils"
import SuspenseLoader from 'src/components/SuspenseLoader';

export default function MediaNft() {
  const { data, loading } = useErc721Contract();


  return (
    <>
    {!loading
    ?
    <Box 
      sx={{
        marginTop: 4,
      }}>
      <Grid container spacing={2}>
        {data.map((nftData, index) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={nftData.image}
                title="Web3Dev Blockchain"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {nftData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {nftData.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    :
    <SuspenseLoader />
    }
    
    </>
  );
}