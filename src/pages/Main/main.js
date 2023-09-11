import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Powerpoint from '../powerpoint/powerpoint';
import { setIsLoading } from '../../reducers/isLoading';
import { useDispatch } from 'react-redux';
import {findSecondInstance} from "../../functions/getIndex"
import Ppt from '../../components/ppt/ppt';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const Main = () => {
  const [slideTopics, setSlideTopics] = useState([]);
  const [slideContent, setSlideContent] = useState([]);
  const [textareaValue, setTextareaValue] = useState('');
  const [noofslides, setNoOfSlides] = useState(0); 
  const dispatch = useDispatch();
const AUTH_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MzIwNTkyMSwianRpIjoiZDAzOTk0MjEtMzdjNi00YzhhLWI4MGItNDdmMTgwN2QyMzUzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjY0YzhhYmY4MzI4NTQ5MWU3OTQ0Y2FmOCIsIm5iZiI6MTY5MzIwNTkyMSwiZXhwIjoxNjkzMzc4NzIxfQ.N1Ne-dtLK_ny9ICeV_jSysLSnTlQKDxiafDFYLMVlH8"
  const postData = async () => {
    if (textareaValue) {
      const requestPayload = {
        max_length: 200,
        prompt: `Generate slide titles topics on ${textareaValue}.
        Generate a presentation outline having ${noofslides} 
        number of slides on topic ${textareaValue}.Only give Topics in one line separated with *.
        
        `,
      };

      const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${AUTH_KEY}`, 
        'Content-Type': 'application/json',
      };

      try {
        dispatch(setIsLoading(true));
        const response = await axios.post
        ('http://192.168.1.122:8082/api/v1/generate', requestPayload, { headers });

        const slideDataT = response.data;
        const arr1 = [];

       console.log(slideDataT);
       const topicsMatch = slideDataT.match(/\d+\.\s*\*?(.+)/g);

if (topicsMatch) {
  topicsMatch.forEach(topic => {
    let title = topic.replace(/^\d+\.\s*\*?/, '').trim();


    title = title.replace(/\*/g, ' ');

    arr1.push(title);
  });
}

        arr1.shift();
        setSlideTopics(arr1);
        
        dispatch(setIsLoading(false));
      } catch (error) {
        dispatch(setIsLoading(false));
        console.error(error);
      }
    }
  };

  useEffect(() => {
    postData();
  }, [textareaValue]);

  
  useEffect(() => {
    const fetchSlideContents = async () => {
      const slideContentsArr = [];

      for (const topic of slideTopics) {
        await delay(1000); 

        const requestPayload = {
          max_length: 250,
          prompt: `Slide Title is ${topic} Give content for ${topic} in points.
          Format is 1.[Point] 2.[Point] and so on.Each slide should not exceed 200 words`
        };

        const headers = {
          'accept': 'application/json',
          'Authorization': `Bearer ${AUTH_KEY} `,
          'Content-Type': 'application/json',
        };

        try {
          dispatch(setIsLoading(true))
          const response = await axios.post('http://192.168.1.122:8082/api/v1/generate', requestPayload, { headers });
          const slideContent = response.data;
          const secondInstanceIndex = findSecondInstance(slideContent, "1");
        const slideContent2 = slideContent?.slice(secondInstanceIndex,slideContent?.length)
          slideContentsArr?.push(slideContent2);
          dispatch(setIsLoading(false))
        } catch (error) {
          console.error(error);
          slideContentsArr?.push(null);
          dispatch(setIsLoading(false))
        }
     
        console.log(slideContentsArr);
      }

      setSlideContent(slideContentsArr);
    };

    fetchSlideContents();
  }, [slideTopics]);

  return (
    <div>
      <Powerpoint
        setnoofslides={setNoOfSlides}
        slideTopics={slideTopics}
        slideContent={slideContent}
        textareaValue={textareaValue}
        setSlideContent={setSlideContent}
        setTextareaValue={setTextareaValue}
        
      />

    </div>
  );
};

export default Main;
