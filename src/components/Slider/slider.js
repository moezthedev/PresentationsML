import React, { useState, useRef, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import img from "../../images/background-card.jpg"
import img2 from "../../images/slider-2.jpg"
import img3 from "../../images/slider-3.jpg"

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

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  return (
    <div>
      
      <Carousel
        index={activeIndex}
        autoPlay={false}
        animation="fade"
        sx={{ p: 4 }}
        navButtonsAlwaysVisible
        navButtonsProps={{ style: { padding: "20px", marginBottom: "40px", backgroundColor: 'transparent', fontSize: '1.5rem' } }}
        NextIcon={<Button onClick={handleNext}>Next</Button>}
        PrevIcon={<Button onClick={handlePrev}>Prev</Button>}
        style={getCarouselStyle()}
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
    ...itemStyleBase,
    backgroundImage: `url(${item.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    return '200px' ;
  } else {
    return '600px' ;
  }
};
const itemStyleBase = {
  height: getCarouselStyle(),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};



export default CarouselComponent;
