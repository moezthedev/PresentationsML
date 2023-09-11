
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { Instagram, Pintrest, ShortlyIcon, Twitter, Youtube } from '../../images/svg'
import { ButtonFooterIcon, ListItemButtonStyled, ListItemCenter } from '../../styles/footer'
import { Colors } from '../../styles/theme'
import Logo from "../../images/logo.png"

const Footer = () => {
    return (
        <Box component={'footer'} sx={{ backgroundColor: Colors.Gray, color: '#fff', py: 8 }} >
            <Container>
                <Grid container>
                    <Grid item md={3}   sm={12}  xs={12} >
                        <Typography sx={{textAlign:"center"}}><img src={Logo} style={{width:"120px"}}/></Typography>
                        {/* <ShortlyIcon sx={{ width: '100%', height: '7rem', mt: -3 }} /> */}
                    </Grid>
                    <Grid item md={2}  sm={4} xs={12} >
                        <List >
                            <ListItem disablePadding >
                                <ListItemButtonStyled   >
                                    <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary="Features"  />
                                </ListItemButtonStyled>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButtonStyled component="a" href="#simple-list">
                                    <ListItemText secondaryTypographyProps={{ variant: 'caption' }}  />
                                </ListItemButtonStyled>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButtonStyled component="a" href="#simple-list">
                                    <ListItemText secondaryTypographyProps={{ variant: 'h7' }} secondary="Branded Links" />
                                </ListItemButtonStyled>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButtonStyled component="a" href="#simple-list">
                                    <ListItemText secondaryTypographyProps={{ variant: 'h7' }} secondary="Analytics" />
                                </ListItemButtonStyled>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={2} sm={4} xs={12} >
                        <List>
                            <ListItem disablePadding >
                                <ListItemButtonStyled >
                                    <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary="Resources" />
                                </ListItemButtonStyled>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButtonStyled component="a" href="#simple-list">
                                    <ListItemText secondaryTypographyProps={{ variant: 'h7' }} secondary=" Blog" />
                                </ListItemButtonStyled>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButtonStyled component="a" href="#simple-list">
                                    <ListItemText secondaryTypographyProps={{ variant: 'h7' }} secondary="Developers" />
                                </ListItemButtonStyled>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButtonStyled component="a" href="#simple-list">
                                    <ListItemText secondaryTypographyProps={{ variant: 'h7' }} secondary="Support" />
                                </ListItemButtonStyled>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={2} sm={4} xs={12} >
                        <List>
                            <ListItem disablePadding >
                                <ListItemButtonStyled >
                                    <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary="Company" />
                                </ListItemButtonStyled>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButtonStyled component="a" href="#simple-list">
                                    <ListItemText secondaryTypographyProps={{ variant: 'h7' }} secondary="About" />
                                </ListItemButtonStyled>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButtonStyled component="a" href="#simple-list">
                                    <ListItemText secondaryTypographyProps={{ variant: 'h7' }} secondary="Our Team" />
                                </ListItemButtonStyled>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButtonStyled component="a" href="#simple-list">
                                    <ListItemText secondaryTypographyProps={{ variant: 'h7' }} secondary="Careers " />
                                </ListItemButtonStyled>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButtonStyled component="a" href="#simple-list">
                                    <ListItemText secondaryTypographyProps={{ variant: 'h7' }} secondary="Contact" />
                                </ListItemButtonStyled>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={3} sm={12} xs={12} >
                        <ListItemCenter   >
                            <ButtonFooterIcon><Instagram sx={{color:"transparent"}}/></ButtonFooterIcon>
                            <ButtonFooterIcon><Twitter /></ButtonFooterIcon>
                            <ButtonFooterIcon><Youtube /></ButtonFooterIcon>
                            <ButtonFooterIcon><Pintrest /></ButtonFooterIcon>
                        </ListItemCenter>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer