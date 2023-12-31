import React from 'react';
import { Card, CardContent, Typography, Grid, Container, IconButton } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Logo from "../../images/logo.png"
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Fade from 'react-reveal/Fade';

const FeatureCards = () => {
  return (
    <>
    <Fade>
    <Container sx={{mt:14,mb:20}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{backgroundColor:"#B5D5C5",color:"##414141",height:"300px",border:"2px double gray"} }>
            <IconButton style={{ alignSelf: 'center', margin: '8px', }}>
             <TipsAndUpdatesIcon sx={{height:"50px",width:"40px"}}/>
            </IconButton>
            <CardContent>
              <Typography variant="h5" sx={{fontWeight:"bold"}}>User-Friendly Slide Editor</Typography>
              <Typography variant="body1">
              Implement alignment and arrangement tools for precise layout control.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{backgroundColor:"#B5D5C5",color:"#414141",height:"300px",border:"2px double gray"}}>
            <IconButton style={{ alignSelf: 'flex-start', margin: '8px' }}>
           < AddReactionIcon sx={{height:"50px",width:"40px"}}/>
            </IconButton>
            <CardContent>
              <Typography variant="h5" sx={{fontWeight:"bold"}}>Templates and Themes</Typography>
              <Typography variant="body1">
              Includes options to customize templates and themes by changing colors, fonts, backgrounds, and more.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{backgroundColor:"#B5D5C5",color:"##414141",height:"300px",border:"2px double gray"}}>
            <IconButton style={{ alignSelf: 'flex-start', margin: '8px' }}>
            <ThumbUpAltIcon sx={{height:"50px",width:"40px"}}/>
            </IconButton>
            <CardContent>
              <Typography variant="h5" sx={{fontWeight:"bold"}}>Export and Sharing Options</Typography>
              <Typography variant="body1">
              Provides sharing options to collaborate on presentations, allowing users to share a link with collaborators or embed slides on websites or blogs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    
    </Container>
    </Fade>
    </>
  );
};

export default FeatureCards;
