import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Powerpoint from "../powerpoint/powerpoint";
import { setIsLoading } from "../../reducers/isLoading";
import { useDispatch } from "react-redux";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Main = () => {
  const [slideTopics, setSlideTopics] = useState([]);
  const [slideContent, setSlideContent] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");
  const [noofslides, setNoOfSlides] = useState(0);
  const dispatch = useDispatch();
  const postData = useCallback(async () => {
    if (textareaValue) {
      const requestPayload = {
        model: "llama3.2",
        prompt: `You are an expert presentation designer with years of experience in creating compelling and structured presentations. Your task is to generate a comprehensive outline for a professional presentation on the topic: "${textareaValue}".

**Requirements for the Outline**:
- Create exactly ${noofslides} slide titles that form a logical flow for the presentation.
- Each title must be concise (5-10 words), engaging, and directly relevant to the overall topic.
- Structure the presentation to include an introduction, main body sections, and a conclusion if applicable.
- Number the titles sequentially as 1., 2., 3., etc.
- Ensure variety in the titles to cover different aspects of the topic without repetition.
- Do not include any additional text, explanations, sub-points, or formatting beyond the numbered list of titles.

**Guidelines for Quality**:
- Make titles action-oriented or informative to capture attention.
- Ensure the sequence builds progressively from basic to advanced concepts.
- Avoid generic titles like "Introduction" unless necessary; be specific.
- Keep the total response focused only on the numbered list.

**Example for a Topic like "Sustainable Energy"**:
1. The Urgency of Sustainable Energy Solutions
2. Key Renewable Energy Technologies
3. Benefits of Transitioning to Renewables
4. Challenges in Implementation
5. Future Outlook for Sustainable Energy

Generate the outline now for the topic "${textareaValue}":`,
        stream: false,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      try {
        dispatch(setIsLoading(true));
        const response = await axios.post(
          "http://localhost:11434/api/generate",
          requestPayload,
          { headers }
        );

        const slideDataT = response.data.response;
        const arr1 = [];

        console.log(slideDataT);
        const topicsMatch = slideDataT.match(/^\d+\.\s*(.+)$/gm);

        if (topicsMatch) {
          topicsMatch.forEach((topic) => {
            let title = topic.replace(/^\d+\.\s*/, "").trim();
            arr1.push(title);
          });
        }

        setSlideTopics(arr1);

        dispatch(setIsLoading(false));
      } catch (error) {
        dispatch(setIsLoading(false));
        console.error(error);
      }
    }
  }, [textareaValue, noofslides, dispatch]);

  useEffect(() => {
    postData();
  }, [textareaValue, postData]);

  useEffect(() => {
    const fetchSlideContents = async () => {
      const slideContentsArr = [];

      for (const topic of slideTopics) {
        await delay(1000);

        const requestPayload = {
          model: "llama3.2",
          prompt: `You are an expert presentation designer tasked with creating high-quality slide content for a professional presentation on the topic: "${textareaValue}".

Slide Title: "${topic}"

Your goal is to generate concise, informative, and engaging content that fits perfectly on one slide. Follow these guidelines strictly:

1. **Content Structure**:
   - Provide exactly 3-5 bullet points.
   - Each bullet point should be a complete sentence or a key phrase that directly supports the slide title.
   - Ensure the content is relevant, accurate, and adds value to the presentation.

2. **Formatting Rules**:
   - Start each bullet point with a dash (-) followed by a space.
   - Do not use any markdown formatting such as **bold**, *italic*, or other special characters.
   - Do not include the slide title in the response.
   - Do not add any introductory text, headings, or conclusions.
   - Keep the entire response under 200 words.

3. **Content Quality**:
   - Use clear, professional language.
   - Focus on facts, explanations, examples, or key insights related to the topic.
   - Make it visually scannable for a slide format.
   - Avoid redundancy and ensure each point is distinct.

4. **Example Output**:
- This is the first key point about the topic.
- Here is the second important detail.
- Third point provides additional insight.
- Fourth point if needed for completeness.

Generate the slide content now based on the title above:`,
          stream: false,
        };

        const headers = {
          "Content-Type": "application/json",
        };

        try {
          dispatch(setIsLoading(true));
          const response = await axios.post(
            "http://localhost:11434/api/generate",
            requestPayload,
            { headers }
          );
          const slideContent = response.data.response;
          slideContentsArr?.push(slideContent);
          dispatch(setIsLoading(false));
        } catch (error) {
          console.error(error);
          slideContentsArr?.push(null);
          dispatch(setIsLoading(false));
        }

        console.log(slideContentsArr);
      }

      setSlideContent(slideContentsArr);
    };

    fetchSlideContents();
  }, [slideTopics, dispatch]);

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
