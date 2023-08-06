//verify-email?verification_key=854e3eb6aaf8d8ddd9db78a2ee2f6c45a0470dab
import React, { useEffect, useState } from 'react';

import { Link,useNavigate,useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AuthLayout from '../AuthLayout';

import Loading from "../../../images/ripple.gif"


export default function VerifyEmail() {

const [emailVerifyKey,setEmailVerifyKey] = useState("")
const [message,setMessage] = useState("")
 

const [isLoading, setIsLoading] = useState(false); 
const navigate = useNavigate()
useEffect(()=>{
    if(emailVerifyKey!==""){
    
        const sendEmailKey = async() =>{
    
        
        try {
           setIsLoading(true)
              const response = await axios.post('https://general-api-ovypaunneq-uc.a.run.app/api/v1/verify-email', {
                verification_key: emailVerifyKey,
                
              });
        
           setMessage(response.data.message)
              console.log(response.data.message);
             setIsLoading(false)
            } catch (error) {
             
              console.error('Error:', error);
              setMessage(error.message)
              setIsLoading(false)
            }
            
        }
        sendEmailKey()
    }
},[emailVerifyKey])

  
 
const location = useLocation(); 
useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('verification_key');

  setEmailVerifyKey(key)
}, [location.search]);
console.log(emailVerifyKey,"msg");
  return (
    <AuthLayout>
      <Typography component="h1" variant="h4" sx={{ mb: 1, mt: 10, fontWeight: 'bold', textAlign: 'center' }}>
       Verify Email
      </Typography>
     
      {
        isLoading?<img style={{width:"30px",height:"25px",marginTop:"70px"}} src={Loading}/>:<h2 style={{ color: message === 'User activated' ? 'green' : 'red',marginTop:"70px" }}>{message}</h2>
      }
      
        
     
     <Typography component="h6" variant="h6" sx={{ mb: 5,mt:3, color: '#726277' }}>
        Sign in{' '}
        <Link to="/login" style={{ color: 'blue', fontWeight: 'bold', textDecoration: 'none' }}>
          Here
        </Link>
      </Typography>
    </AuthLayout>
  );
}
