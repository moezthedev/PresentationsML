import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link,useNavigate } from 'react-router-dom';
import LinkMUI from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { getCookie } from '../../../functions/getCookie';
import AuthLayout from '../AuthLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setFormState} from '../../../reducers/formState';
import { setUserToken} from '../../../reducers/userToken';
import { setisUserLoggedIn} from '../../../reducers/isUserLoggedIn';
import GoogleLogin from "../../../components/googlelogin/googlelogin"
import Loading from "../../../images/ripple.gif"

export default function Login() {

  const formState = useSelector((state) => state.formState.formState);
  const dispatch = useDispatch()
  
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
const userToken = useSelector((state) => state.userToken.userToken);
const [isLoading, setIsLoading] = useState(false); 
const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    const emailValue = event.target.elements.email.value;
    const passwordValue = event.target.elements.password.value;

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError(true);
      
      return;
    } else {
      setEmailError(false);
    }

    if (passwordValue.length < 8) {
      setPasswordError(true);
      
      return;
    } else {
      setPasswordError(false);
    }

    try {
      const response = await axios.post(
        'https://general-api-ovypaunneq-uc.a.run.app/api/v1/login',
        {
          email: emailValue,
          password: passwordValue,
        }
      );
      dispatch(setFormState(response.data.message));
      dispatch(setisUserLoggedIn(true))
      console.log(response.data.access_token);
      dispatch(setUserToken(response.data.access_token))
     
      document.cookie = `userToken=${response.data.access_token}; expires=2; path=/`;
    } catch (error) {
     console.log(error);
      if (error.response) {
        dispatch(setisUserLoggedIn(false))
        dispatch(setFormState(error.response.data.message));
      } else {
        dispatch(setFormState('An error occurred while processing your request.'));
       dispatch(setisUserLoggedIn(false)) 
      }
    }
    finally {
      setIsLoading(false);
    }
  };



  useEffect(()=>{
    if(getCookie("userToken")){
      dispatch(setisUserLoggedIn(true)) 
      dispatch(setFormState(""));
      navigate("/")
    } 
  },[userToken])
 


  return (
    <AuthLayout>
      <Typography component="h1" variant="h4" sx={{ mb: 1, mt: 5, fontWeight: 'bold', textAlign: 'center' }}>
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
          label="User Name or Email"
          name="email"
          autoComplete="email"
          autoFocus
          error={emailError}
          helperText={emailError ? 'Invalid email address' : ''}
          sx={{ width: '300px'}}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={passwordError}
          helperText={passwordError ? 'Password must be at least 8 characters' : ''}
          
          sx={{
            mt: 1,
            width: '300px',
            
          }}
        />
       
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2, width: '300px' }}>
          {!isLoading?"Log In":<img style={{width:"30px",height:"25px"}} src={Loading} alt='Loading'/>}
        </Button>
       {formState&&<p style={{ color: formState === 'Invalid credentials' ? 'red' : 'red' }}>{formState}</p>}
        <Grid container>
          <Grid item xs>
            <LinkMUI href="/login" variant="body2 " sx={{ color: 'gray' }}>
              <Link to="/enter-email">Forgot Password?</Link>
            </LinkMUI>
          </Grid>
        </Grid>
        <Typography sx={{ mt: 4, color: 'gray' }}>OR</Typography>
        <Typography><GoogleLogin/></Typography>
      </Box>
    </AuthLayout>
  );
}
