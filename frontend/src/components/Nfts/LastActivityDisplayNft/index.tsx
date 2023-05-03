import {Card, CardActions, CardActionArea, CardContent, CardMedia, Button,Tooltip, Typography, Box, Grid, Avatar, styled, alpha} from '@mui/material';
import { AddTwoTone, TrendingUp } from '@mui/icons-material';
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useShortenAddressOrEnsName } from 'src/utils/Web3Utils';

export default function LastActivityDisplayNft( {lastToken}) {

    const handleButtonActivityDetails = () => {
      window.location.href = "/dapp/activity-details";
    };
    
    return(
      <>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box p={4} sx={{
                  width: '94%'
                }}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Last activity created
            </Typography>
            <Card >
              <CardMedia
                sx={{ height: 180 }}
                image={lastToken && lastToken.image}
                title="Web3Dev Blockchain"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {lastToken && lastToken.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {lastToken && lastToken.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" onClick={handleButtonActivityDetails}>Activity Details</Button>
              </CardActions>
            </Card>
          </Box>          
        </Grid>    
      </>
  
    );
  }