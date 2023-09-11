import React, { useState } from 'react';
import './slider.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Navbar from '../../components/navPowerPoint/navbar';
import { ConvertToHighlight } from '../../functions/convertToHighligh';



const Slider = ({ setTextareaValue, slideTopics, slideContent, setnoofslides,textareaValue,setSlideContent}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const isLoading = useSelector((state) => state.isLoading.isLoading);


  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setTextareaValue(event.target.elements.textareavalue.value);
    setnoofslides(event.target.elements.noofslides.value);
    setShowSlider(true);
  };

 
 

  return (
      
    <div>
    <Navbar activeIndex={activeIndex} slideTopics={slideTopics} textareaValue={textareaValue} slideContent={slideContent} setSlideContent={setSlideContent}/>
      {!showSlider ? (
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            gap: '20px',
            overflow: 'hidden',
            backgroundColor: '#96CCD1',
          }}
          className="search-form"
        >
          <textarea
            name="textareaValue"
            id="textareavalue"
            rows={15}
            cols={70}
            placeholder="Enter your content..."
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              resize: 'vertical',
              width: '80%',
              fontSize: '16px',
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            name="noofslides"
            label="noofslides"
            sx={{
              mt: 1,
              width: '300px',
            }}
          />
          <Button type="submit" variant="contained" sx={{ mb: 2 }}>
            Submit
          </Button>
        </form>
      ) : (
        <div className="slider-container">
          <div className="slides-outline">
            {slideTopics && slideTopics?.length === 0 ? (
               <Box sx={{ width: 300 }}>
               <Skeleton sx={{mt:3,height:30}}/>
               <Skeleton sx={{mt:3,height:30}}animation="wave" />
               <Skeleton sx={{mt:3,height:30}} animation={false} />
               <Skeleton sx={{mt:3,height:30}} animation="wave" />
               <Skeleton sx={{mt:3,height:30}}animation="wave" />
               <Skeleton sx={{mt:3,height:30}} animation="wave" />
               <Skeleton sx={{mt:3,height:30}} animation="wave" />
               <Skeleton sx={{mt:3,height:30}} animation="wave" />
               <Skeleton sx={{mt:3,height:30}} animation="wave" />
             </Box>
            ) : (
              slideTopics?.map((content, index) => (
                <div
                  key={index}
                  className={`slide-outline ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                >
                  <span className="slide-number"> {index + 1}</span>
                  <span className="zoomed-out-content">{content?.slice(0, 200)}</span>
                </div>
              ))
            )}
          </div>
          <div className="slider">
            <div className="slides" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                   <Box sx={{ width: 1000 }}>
      <Skeleton sx={{m:5,height:50,width: 1000}} />
      <Skeleton sx={{m:5,height:50,width: 1000}} animation="wave" />
      <Skeleton sx={{m:5,height:50,width: 1000}} animation={false} />
      <Skeleton sx={{m:5,height:50,width: 1000}} animation="wave" />
      <Skeleton sx={{m:5,height:50,width: 1000}} animation={false} />
      <Skeleton sx={{m:5,height:50,width: 1000}} animation="wave"/>  
      <Skeleton sx={{m:5,height:50,width: 1000}} animation="wave"/>  
      
    </Box>
                </div>
              ) : (
                
                slideContent?.map((content, index) => (

                  <div key={index} className={`slide ${index === activeIndex ? 'active' : ''}`}>
                                      <h2>{slideTopics[index]}</h2>
                    <ul>
                      {content?.split('\n')?.map((point, pointIndex) => (
                        <p key={pointIndex}>{ConvertToHighlight(point)}</p>
                      ))}
                    </ul>
                  </div>
                  
                ))
              )}
            </div>
          </div>
        </div>
      )}

     


    </div>
  );
};

export default Slider;
