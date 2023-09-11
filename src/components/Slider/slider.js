import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import img from "../../images/background-card.jpg"
import img2 from "../../images/slider-2.jpg"
import img3 from "../../images/slider-3.jpg"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const carouselItems = [
  {
    imageUrl: `${img}`,
    caption: 'Image 1',
  },
  {
    imageUrl: `${img2}`,
    caption: 'Image 2',
  },
  {
    imageUrl: `${img3}`,
    caption: 'Image 3',
  },
];

const CarouselComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % carouselItems.length;
    setActiveIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (activeIndex + 1) % carouselItems.length;
      setActiveIndex(newIndex);
    }, 5000); // Change image every 5 seconds

    const handleWindowResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [activeIndex]);

  return (
    <div>
      <Carousel
        index={activeIndex}
        autoPlay={true}
        animation="fade"
        sx={{mb:10}}
        navButtonsAlwaysInVisible={true}
        navButtonsProps={{ style: {  backgroundColor: 'transparent', fontSize: '1.2rem' } }}
        NextIcon={!isMobile && <ArrowForwardIosIcon style={{ color: "#fff" }} onClick={handleNext}></ArrowForwardIosIcon>}
        PrevIcon={!isMobile && <ArrowBackIosIcon style={{ color: "#fff",marginLeft:"8px" }} onClick={handlePrev}></ArrowBackIosIcon>}
        style={{ height: getCarouselStyle() }}
      >
        {carouselItems.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

const Item = ({ item }) => {
  const itemStyle = {
    backgroundImage: `url(${item.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    ...itemStyleBase,
  };

  return (
    <Paper elevation={3} style={itemStyle}>
      <h2>{item.caption}</h2>
    </Paper>
  );
};

const getCarouselStyle = () => {
  const isMobile = window.innerWidth <= 576;

  if (isMobile) {
    return '200px';
  } else {
    return '600px';
  }
};

const itemStyleBase = {
  height: getCarouselStyle(),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width:"100%"
 
};

export default CarouselComponent;
