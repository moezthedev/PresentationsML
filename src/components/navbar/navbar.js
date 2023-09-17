import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import {setisUserLoggedIn} from "../../reducers/isUserLoggedIn";
import {  useNavigate } from "react-router-dom";
const pages = ["Home", "Products", "Blog", "About US"];

function ResponsiveAppBar({handleLogout,name}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn.isUserLoggedIn);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
if(name){
  dispatch(setisUserLoggedIn(true))
} else if(!name){
  dispatch(setisUserLoggedIn(false))
}
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#0B666A" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>  <img src={logo} style={{ width: "60px" }} alt="Company Logo" /></Box>
        
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SlideSync
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>  <img src={logo} style={{ width: "60px" }} alt="Company Logo" /></Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SlideSync
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
<Box sx={{flexGrow:0,mb:0.75,mr:0.5}}>{name?name:''}</Box>
          <Box sx={{ flexGrow: 0 }}>
            {isUserLoggedIn ? (
              <Button onClick={handleLogout} style={{ color: "white" }}>Logout</Button>
            ) : (
              <Button onClick={()=>navigate("/login")} style={{ color: "white" }}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
