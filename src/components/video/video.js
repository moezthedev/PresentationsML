import React, { useEffect, useState } from 'react';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
const Video = () => {
  const [videoContainerStyle, setVideoContainerStyle] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      if (windowWidth <= 576) {
        setVideoContainerStyle({ height: '80%', width: '100%' });
      } else if (windowWidth > 576 && windowWidth <= 768) {
        setVideoContainerStyle({ height: '70%', width: '70%' });
      } else {
        setVideoContainerStyle({ height: '70%', width: '70%' });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: '30px', maxWidth: '92%', marginBottom: '50px' }}>
      
      <div style={videoContainerStyle}>

        <Player
          playsInline
          poster="/assets/poster.png"
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          fluid
        />
      </div>
    </div>
  );
};

export default Video;
