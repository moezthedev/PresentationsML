import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import "./passwordReset.css"
import AuthLayout from '../AuthLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setFormState } from '../../../reducers/formState';
import Loading from "../../../images/ripple.gif"

export default function PasswordReset() {

  const formState = useSelector((state) => state.formState.formState);
  const dispatch = useDispatch()

  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailValue = event.target.elements.email.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(emailValue) || !emailValue==="") {
      setEmailError(true);
      
      
    } else if(emailRegex.test(emailValue)) {
      setEmailError(false);
 
    }
  
if(emailRegex.test(emailValue) || !emailValue===""){

  setIsLoading(true)
    const apiUrl = 'https://general-api-ovypaunneq-uc.a.run.app/api/v1/password-reset-request';
    const requestBody = {
      email: emailValue,
    };

    axios
      .post(apiUrl, requestBody)
      .then((response) => {
       console.log("response",response.data.message);
     
       dispatch(setFormState(response.data.message))
       setIsLoading(false)
      })
      .catch((error) => {
        dispatch(setFormState(error.response.data.message))
        console.log("error",error.response.data.message);
        
        setIsLoading(false)
      });
  
      
    }
  };



  
 

  return (
    <AuthLayout>
      <Typography component="h1" variant="h4" sx={{ mb: 3, mt: 15, fontWeight: 'bold', textAlign: 'center' }}>
        Welcome to Runway
      </Typography>
      <Typography component="h6" variant="h6" sx={{ mb: 5, color: '#726277' }}>
        Dont have an account?{' '}
        <Link to="/register" style={{ color: 'blue', fontWeight: 'bold', textDecoration: 'none' }}>
          Sign Up
        </Link>
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, textAlign: 'center' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          id="email"
          label="Enter your Email"
          name="email"
          autoComplete="email"
          autoFocus
          error={emailError}
          helperText={emailError ? 'Invalid email address' : ''}
          sx={{ width: '300px'}}
        />
       
       
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 2, width: '300px' }}>
          {!isLoading?"Send Email":<img style={{width:"30px",height:"25px"}} src={Loading}/>}
        </Button>
       {formState&&<p className={formState==="User does not exist"?"red":"green"}>{formState}</p>}
        <Grid container>
          <Grid item xs>
          
          </Grid>
        </Grid>
      
       
      </Box>
    </AuthLayout>
  );
}
