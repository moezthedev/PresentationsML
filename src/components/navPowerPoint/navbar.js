import React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { Menu } from '@mui/material';
import {MenuItem} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Document, Page, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import Ppt from '../../components/ppt/ppt';
const styles = StyleSheet.create({
  bold: {
    fontWeight: '900',
  },
  highlight: {
    backgroundColor: '#D5FFE4',
  },
  code: {
    backgroundColor: '#D5FFE4',
    fontFamily: 'monospace',
  },
});

const PdfDocument = ({ slideContent,slideTopics }) => (
  <Document>
    {slideContent?.map((content, index) => (
      <Page key={index} style={styles.page}>
        <Text>
          {content.map((item, itemIndex) => (
          
            <Text key={itemIndex} style={getItemStyle(item)}>
                <Text  style={styles.bold}>{slideTopics[itemIndex]}</Text>
              {item.text}
            </Text>
          ))}
        </Text>
      </Page>
    ))}
  </Document>
);

const getItemStyle = item => {
  const styleList = [];
  if (item.isBold) {
    styleList.push(styles.bold);
  }
  if (item.isHighlight) {
    styleList.push(styles.highlight);
  }
  if (item.isCode) {
    styleList.push(styles.code);
  }

  return styleList;
};

const Navbar = ({ textareaValue, slideContent,slideTopics,setSlideContent,activeIndex }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuText, setMenuText] = useState(slideContent);
  const processedSlideContent = slideContent?.map(content => {
    const textItems = [];
    let currentText = '';
    let currentStyles = {};

    for (const char of content) {
      if (char === ':') {
        
        textItems.push({ text: currentText, ...currentStyles });

       
        currentText = '';
        currentStyles = {};
      } else if (currentText === '' && char === '*') {
      
        currentStyles = { isBold: true };
      } else {
        currentText += char;
      }
    }


    if (currentText) {
      textItems.push({ text: currentText });
    }

    return textItems;
  });

  const handleEdit = () => {
    setIsMenuOpen(prevState => !prevState);
  };
  useEffect(() => {
    if (slideContent && slideContent[activeIndex]) {
      setMenuText(slideContent[activeIndex]); // Set the content of the selected slide
    } else {
      setMenuText(''); // Clear the textarea if no content is available
    }
  }, [activeIndex, slideContent]);
  
const handleMenuTextChange = event => {
  setMenuText(event.target.value);
  console.log(event.target.value,"val");
};
const handleCloseMenu = () => {
  setIsMenuOpen(false);
};
const handleClick = () => {
  if (activeIndex !== null && menuText) {
    // Create a copy of the slideContent array
    const updatedSlideContent = [...slideContent];
    
    // Update the content at the activeIndex
    updatedSlideContent[activeIndex] = menuText;

    // Set the updated slideContent
    setSlideContent(updatedSlideContent);
  }
};


  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Present</Typography>
<Typography>
<div sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '4px', padding: '5px', flexGrow: 1 }}>
          <InputBase sx={{ color: 'inherit', padding: '10px 30px 10px 12px', width: '100%' }} value={textareaValue} />
        </div>

</Typography>
        
     

        <Typography sx={{ display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
        {slideContent && (
          <div style={{marginTop:"9.5px"}}>
            <PDFDownloadLink
              document={<PdfDocument slideTopics={slideTopics} slideContent={processedSlideContent} />}
              fileName="generated_pdf.pdf"
              style={{ textDecoration: 'none', color: '#fff'}}
            >
              {({ blob, url, loading, error }) => (slideContent?.length === 0 ? '' : 'Download PDF')}
            </PDFDownloadLink>
          </div>
        )}

        <Ppt  slideContent={slideContent} slideTopics={slideTopics}/>
          <IconButton color="inherit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
            <Menu
              anchorEl={isMenuOpen}
              open={Boolean(isMenuOpen)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
             
            >
            <MenuItem>
              <InputBase
                multiline
                fullWidth
              value={menuText}
                onChange={handleMenuTextChange}
                placeholder="Enter/Edit Content"
                style={{ width: '600px', }} // Adjust the size here
              />
            </MenuItem>
            <MenuItem>
            <button onClick={handleClick}>Edit</button>
            </MenuItem>
          </Menu>
          <IconButton color="inherit">
            <FormatColorTextIcon />
          </IconButton>
         
       
         
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
