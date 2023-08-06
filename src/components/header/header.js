import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, useMediaQuery, useTheme, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import headerImg from "../../images/header-img.svg";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showArrow, setShowArrow] = useState(true);
  const [parent] = useAutoAnimate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Grid    elevation={3} style={{ padding: isMobile ? "30px" : "50px", paddingTop: isMobile ? "50px" : "100px" }}>
      <Grid container alignItems="center" spacing={5}>
        
        <Grid ref={parent} item xs={12} md={6}>

          
          <Typography  variant="h3" style={{ fontWeight: "bolder", color: "#2D3748", fontSize: isMobile ? "40px" : "90px" }}>
            Turn your ideas into a<span style={{ color: "#1976D2" }}> success.</span>
          </Typography>
          <Typography sx={{ pt: 3, pb: 3, color: "#757E83", fontSize: "large" }} variant="body1" paragraph>
            Discover amazing things with our innovative solutions. Our company will make your product look modern and professional while saving you precious time.
          </Typography>
          <Button  variant="contained" color="primary">
            Get Started
          </Button>
        </Grid>

       
        <Grid item xs={12} md={6}>
          <img
            src={headerImg}
            alt="Responsive Image"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Grid>

        {/* Down arrow */}
        {showArrow && (
          <IconButton
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'transparent',
              fontSize: '2rem',
              color: 'rgba(0, 0, 0, 0.6)',
              animation: 'bounce 0.5s infinite',
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
