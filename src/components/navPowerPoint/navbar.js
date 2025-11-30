import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import Ppt from "../../components/ppt/ppt";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import logo from "../../images/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ArticleIcon from "@mui/icons-material/Article";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const styles = StyleSheet.create({
  bold: {
    fontWeight: "900",
  },
  highlight: {
    backgroundColor: "#D5FFE4",
  },
  code: {
    backgroundColor: "#D5FFE4",
    fontFamily: "monospace",
  },
});

const PdfDocument = ({ slideContent, slideTopics }) => (
  <Document>
    {slideContent?.map((content, index) => (
      <Page key={index} style={styles.page}>
        <Text>
          {content.map((item, itemIndex) => (
            <Text key={itemIndex} style={getItemStyle(item)}>
              <Text style={styles.bold}>{slideTopics[itemIndex]}</Text>
              {item.text}
            </Text>
          ))}
        </Text>
      </Page>
    ))}
  </Document>
);

const getItemStyle = (item) => {
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

const Navbar = ({
  textareaValue,
  slideContent,
  slideTopics,
  setSlideContent,
  activeIndex,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuText, setMenuText] = useState(slideContent);
  const processedSlideContent = slideContent?.map((content) => {
    const textItems = [];
    let currentText = "";
    let currentStyles = {};

    for (const char of content) {
      if (char === ":") {
        textItems.push({ text: currentText, ...currentStyles });

        currentText = "";
        currentStyles = {};
      } else if (currentText === "" && char === "*") {
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
    setIsMenuOpen((prevState) => !prevState);
  };
  useEffect(() => {
    if (slideContent && slideContent[activeIndex]) {
      setMenuText(slideContent[activeIndex]); // Set the content of the selected slide
    } else {
      setMenuText(""); // Clear the textarea if no content is available
    }
  }, [activeIndex, slideContent]);

  const handleMenuTextChange = (event) => {
    setMenuText(event.target.value);
    console.log(event.target.value, "val");
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
  const navigate = useNavigate();
  const handleNavClick = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
            alt="Company Logo"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "#fff",
              textDecoration: "none",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.2rem",
            }}
          >
            SlideSync
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <InputBase
            sx={{
              color: "inherit",
              padding: "10px 12px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: "4px",
              width: "300px",
            }}
            value={textareaValue}
            readOnly
          />
        </Box>

        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Ppt slideContent={slideContent} slideTopics={slideTopics} />
          <IconButton color="inherit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <Menu
            anchorEl={isMenuOpen}
            open={Boolean(isMenuOpen)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPaper-root": {
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
              },
            }}
          >
            <MenuItem>
              <InputBase
                multiline
                fullWidth
                value={menuText}
                onChange={handleMenuTextChange}
                placeholder="Enter/Edit Content"
                style={{ width: "600px" }}
              />
            </MenuItem>
            <MenuItem>
              <button onClick={handleClick}>Edit</button>
            </MenuItem>
          </Menu>
          <IconButton color="inherit">
            <FormatColorTextIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
