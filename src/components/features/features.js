import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  IconButton,
} from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Fade from "react-reveal/Fade";

const FeatureCards = () => {
  return (
    <>
      <Fade>
        <Container sx={{ mt: 14, mb: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(45deg, #B5D5C5 30%, #E8F5E8 90%)",
                  color: "#414141",
                  height: "300px",
                  border: "2px solid #4CAF50",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <IconButton style={{ alignSelf: "center", margin: "8px" }}>
                  <TipsAndUpdatesIcon sx={{ height: "50px", width: "40px" }} />
                </IconButton>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    User-Friendly Slide Editor
                  </Typography>
                  <Typography variant="body1">
                    Implement alignment and arrangement tools for precise layout
                    control.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(45deg, #B5D5C5 30%, #E8F5E8 90%)",
                  color: "#414141",
                  height: "300px",
                  border: "2px solid #4CAF50",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <IconButton style={{ alignSelf: "flex-start", margin: "8px" }}>
                  <AddReactionIcon sx={{ height: "50px", width: "40px" }} />
                </IconButton>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Templates and Themes
                  </Typography>
                  <Typography variant="body1">
                    Includes options to customize templates and themes by
                    changing colors, fonts, backgrounds, and more.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(45deg, #B5D5C5 30%, #E8F5E8 90%)",
                  color: "#414141",
                  height: "300px",
                  border: "2px solid #4CAF50",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <IconButton style={{ alignSelf: "flex-start", margin: "8px" }}>
                  <ThumbUpAltIcon sx={{ height: "50px", width: "40px" }} />
                </IconButton>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Export and Sharing Options
                  </Typography>
                  <Typography variant="body1">
                    Provides sharing options to collaborate on presentations,
                    allowing users to share a link with collaborators or embed
                    slides on websites or blogs.
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
