import React, { useState } from 'react';
import pptxgen from 'pptxgenjs';
import ppt from "../../images/ppt.jpg";
import ppt1 from "../../images/ppt1.jpg";
import ppt2 from "../../images/ppt2.jpg";
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import {Stack} from '@mui/material';
const Ppt = ({ slideTopics, slideContent }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState();

  const generatePpt = (backgroundImage) => {
    const pptx = new pptxgen();

    for (let i = 0; i < slideTopics.length; i++) {
      const slide = pptx.addSlide();

      slide.addImage({
        path: backgroundImage,
        x: 0,
        y: 0,
        w: 11,
        h: 6,
      });

      slide.addText(slideTopics[i]?.substring(0, 100), {
        x: 1,
        y: 1.3,
        fontFace: 'Arial',
        fontSize: 20,
        color: '000000',
        fontWeight: 900,
      });

      const yOffset = 1.5 + 1.5;

      slide.addText(slideContent[i], {
        x: 1,
        y: yOffset,
        fontFace: 'Arial',
        fontSize: 10,
        color: '000000',
      
      });
    }

    pptx.writeFile('presentation');
  };

  const handleOpenMenu = (event) => {
    
    
  
      setAnchorEl(event.currentTarget);
   
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleBackgroundChange = (backgroundImage) => {
  
    
      
   
      
        setSelectedBackground(backgroundImage);
        handleCloseMenu(); 
        generatePpt(backgroundImage)
    

  };

  return (
    <div>
      <Button
        style={{ marginTop: '2px' }}
        onClick={handleOpenMenu}
        variant="outline"
        
      >
        Generate PowerPoint
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        getContentAnchorEl={null}
      
      >
        <Stack sx={{p:2}}>
          <Typography sx={{pl:4}}>Select Theme</Typography>
        <MenuItem onClick={() => handleBackgroundChange(ppt)}><img style={{width:"150px"}} src={ppt}/></MenuItem>
        <MenuItem onClick={() => handleBackgroundChange(ppt1)}><img style={{width:"150px"}} src={ppt1}/></MenuItem>
        <MenuItem onClick={() => handleBackgroundChange(ppt2)}><img style={{width:"150px"}} src={ppt2}/></MenuItem>
        </Stack>
      </Menu>
    </div>
  );
};

export default Ppt;
