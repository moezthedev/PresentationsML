import React from 'react';
import { Card, CardContent, Typography, Grid, Container, IconButton } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Logo from "../../images/logo.png"
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const FeatureCards = () => {
  return (
    <Container sx={{mt:14,mb:10}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{backgroundColor:"#4B5770",color:"#fff",height:"300px"}}>
            <IconButton style={{ alignSelf: 'center', margin: '8px', }}>
             <TipsAndUpdatesIcon sx={{height:"50px",width:"40px"}}/>
            </IconButton>
            <CardContent>
              <Typography variant="h5" sx={{fontWeight:"bold"}}>Feature 1</Typography>
              <Typography variant="body1">
                This is the first feature of our app. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{backgroundColor:"#4B5770",color:"#fff",height:"300px"}}>
            <IconButton style={{ alignSelf: 'flex-start', margin: '8px' }}>
           < AddReactionIcon sx={{height:"50px",width:"40px"}}/>
            </IconButton>
            <CardContent>
              <Typography variant="h5" sx={{fontWeight:"bold"}}>Feature 2</Typography>
              <Typography variant="body1">
                This is the second feature of our app. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{backgroundColor:"#4B5770",color:"#fff",height:"300px"}}>
            <IconButton style={{ alignSelf: 'flex-start', margin: '8px' }}>
            <ThumbUpAltIcon sx={{height:"50px",width:"40px"}}/>
            </IconButton>
            <CardContent>
              <Typography variant="h5" sx={{fontWeight:"bold"}}>Feature 3</Typography>
              <Typography variant="body1">
                This is the third feature of our app. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeatureCards;
