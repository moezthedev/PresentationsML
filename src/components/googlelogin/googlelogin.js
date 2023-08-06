import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const GoogleLoginComponent = () => {

  const clientId = '444902640845-knomcs2661nnu5i1qq0r1rvhb5caftsl.apps.googleusercontent.com';
  const navigate = useNavigate();
  const handleSuccess = (response) => {
    


    let name = response.wt.Ad;
  
    // document.cookie = `userToken=${response.tokenId}; expires=2; path=/`;
   navigate("/")
  };

  const handleFailure = (error) => {
    // Handle any error that occurs during login
    // onFailure(error);
    console.log("Google failure");
  };

  return (
  
 
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
      style={{ width: '300px' }}
    />
    
  );
};

export default GoogleLoginComponent;
