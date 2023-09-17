import React from 'react';
import './menu.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const handleClick = ()=>{
        navigate("/")
    }
  
  return (
    <>
    <div style={{cursor:"pointer",backgroundColor:"#96CCD1",color:"#333",fontSize:"20px",textAlign:"center"}} onClick={toggleMenu}>
    Check status:
    </div>
    <div className={`menu ${isOpen ? 'open' : ''}`}>

      <button className="close-button" onClick={toggleMenu}>
       X
      </button>
      
      
      <p>Slider feature is currently unavailable due to high cost of backend machine learning model. We apologize for any inconvenience. </p>
    <p>To see how this slider worked <button onClick={handleClick} style={{cursor:"pointer"}} >Click Here</button></p>
    </div>
    </>
  );
};

export default Menu;
