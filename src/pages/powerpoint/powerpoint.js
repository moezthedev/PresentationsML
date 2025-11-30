import React, { useState, useCallback } from "react";
import "./slider.css";
import {
  Button,
  TextField,
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Navbar from "../../components/navPowerPoint/navbar";
import { ConvertToHighlight } from "../../functions/convertToHighligh";
import Menu from "../../components/menu/menu";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import debounce from "lodash.debounce";

const Slider = ({
  setTextareaValue,
  slideTopics,
  slideContent,
  setnoofslides,
  textareaValue,
  setSlideContent,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const isLoading = useSelector((state) => state.isLoading.isLoading);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const debouncedSetTextareaValue = useCallback(
    debounce(setTextareaValue, 500),
    [setTextareaValue]
  );
  const debouncedSetNoOfSlides = useCallback(debounce(setnoofslides, 500), [
    setnoofslides,
  ]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const topic = event.target.elements.textareaValue.value;
    const slides = event.target.elements.noofslides.value;
    debouncedSetTextareaValue(topic);
    debouncedSetNoOfSlides(slides);
    setShowSlider(true);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slideTopics.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + slideTopics.length) % slideTopics.length
    );
  };

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const MemoizedSlide = React.memo(({ content, title, index }) => (
    <motion.div
      key={index}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Card
        sx={{
          height: "100%",
          p: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {content?.split("\n")?.map((point, pointIndex) => (
              <Typography
                key={pointIndex}
                component="li"
                sx={{ mb: 1, fontSize: "1.1rem" }}
              >
                {ConvertToHighlight(point)}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  ));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Navbar
        activeIndex={activeIndex}
        slideTopics={slideTopics}
        textareaValue={textareaValue}
        slideContent={slideContent}
        setSlideContent={setSlideContent}
      />
      <Menu />
      {!showSlider ? (
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            p: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={10}
              sx={{
                p: 4,
                maxWidth: 600,
                width: "100%",
                borderRadius: 3,
                background: "rgba(255,255,255,0.9)",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                Create Your Presentation
              </Typography>
              <TextField
                name="textareaValue"
                multiline
                rows={8}
                placeholder="Enter your topic or content..."
                fullWidth
                variant="outlined"
                sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                name="noofslides"
                type="number"
                label="Number of Slides"
                fullWidth
                variant="outlined"
                sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: "1.1rem",
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                }}
              >
                Generate Slides
              </Button>
            </Paper>
          </motion.div>
        </Box>
      ) : (
        <Grid container sx={{ height: "calc(100vh - 64px)" }}>
          <Grid
            item
            xs={3}
            sx={{ p: 2, background: "#f0f0f0", overflowY: "auto" }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Slide Outline
            </Typography>
            {slideTopics?.length === 0
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} sx={{ mb: 1, height: 40 }} />
                ))
              : slideTopics?.map((content, index) => (
                  <Chip
                    key={index}
                    label={`${index + 1}. ${content?.slice(0, 30)}...`}
                    onClick={() => goToSlide(index)}
                    sx={{
                      mb: 1,
                      width: "100%",
                      justifyContent: "flex-start",
                      background: index === activeIndex ? "#667eea" : "#e0e0e0",
                      color: index === activeIndex ? "white" : "black",
                      "&:hover": { background: "#764ba2", color: "white" },
                    }}
                  />
                ))}
          </Grid>
          <Grid item xs={9} sx={{ position: "relative", p: 2 }}>
            <Box sx={{ height: "100%", position: "relative" }}>
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <LinearProgress sx={{ width: "80%", mb: 2 }} />
                  <Typography>Generating slides...</Typography>
                </Box>
              ) : (
                <AnimatePresence mode="wait">
                  <MemoizedSlide
                    content={slideContent[activeIndex]}
                    title={slideTopics[activeIndex]}
                    index={activeIndex}
                  />
                </AnimatePresence>
              )}
              {!isLoading && slideTopics.length > 1 && (
                <>
                  <IconButton
                    onClick={prevSlide}
                    sx={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.5)",
                      color: "white",
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <IconButton
                    onClick={nextSlide}
                    sx={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.5)",
                      color: "white",
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Slider;
