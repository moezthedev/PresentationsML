import  React,{useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinkMUI from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AuthLayout from '../AuthLayout';
import { useNavigate,Outlet} from 'react-router-dom';
import { validateCookie } from '../../../functions/validateCookie';
import { useSelector,useDispatch } from 'react-redux/';
import { setIsLoading } from '../../../reducers/isLoading';
import axios from "axios"
import Loading from "../../../images/ripple.gif"
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  name:Yup.string().required("Name is required"),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Must be at least 8 chars')
    .matches(
      /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Add special character'
    ),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Register() {
 
  const [registerationError,setRegistrationError] = useState("")
  const [message,setMessage] = useState("")
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  console.log(validateCookie(),"valid");
 
 
  const handleSubmit = async(event) => {
    event.preventDefault();
    const emailRegister = event.target.elements.email.value;
    const name = event.target.elements.name.value
    const passwordRegister = event.target.elements.password.value;
    const confirmPasswordRegister = event.target.elements.password.value;
 if(name!==''&&emailRegister!==''&&passwordRegister!==''&&confirmPasswordRegister!==''){
dispatch(setIsLoading(true))
  try {
      const response = await axios.post('https://general-api-ovypaunneq-uc.a.run.app/api/v1/register', {
        email: emailRegister,
        name: name,
        password: passwordRegister,
      });

      
      console.log('Response:', response.data);
      
      dispatch(setIsLoading(false))
      setMessage(response.data.message + " Please check email")
      setRegistrationError("")
      
    } catch (error) {
      
      console.error('Error:', error.message);
      setRegistrationError(error.message)
      dispatch(setIsLoading(false))
      setMessage("")
    }
 }
  else if(!emailRegister|| !passwordRegister || !name ){
    setRegistrationError("* Fields are required")  }
    
  };


  return (
    <AuthLayout>
      <Typography component="h1" variant="h4" sx={{ mb: 1, mt: 5, fontWeight: 'bold', textAlign: 'center' }}>
        Register
      </Typography>
      <Typography component="h6" variant="h6" sx={{ mb: 5, color: '#726277' }}>
        Already have an account? <Link to="/login" style={{ color: 'blue', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
      </Typography>

      <Formik
        initialValues={{
          email: '',
          password: '',
          name:'',
          confirmpassword: '',
        }}
        validationSchema={validationSchema}
        
     
      >
        {({ touched, errors }) => (
          
            <Box  component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: 'center' }}>
             <Field
                as={TextField}
                type="name"
                name="name"
                label="Name"
                margin="normal"
                required
                size="small"
                fullWidth
                error={touched.name && !!errors.name}
                sx={{ mb: 5, mt: 2, height: '10px', width: '300px' }}
              />
            
            <ErrorMessage style={{fontSize:"13px",marginRight:"180px"}} name="name" component="div" sx={{ color: 'red', }} />
              <Field
                as={TextField}
                type="email"
                name="email"
                label="Email"
                margin="normal"
                required
                size="small"
                fullWidth
                error={touched.email && !!errors.email}
                sx={{ width: '300px',mt:2 }}
              />
              
              <ErrorMessage style={{fontSize:"13px",marginRight:"180px"}} name="email" component="div" sx={{ color: 'red',textAlign:"left",fontSize:"5px" }} />

              <Field
                as={TextField}
                type="password"
                name="password"
                label="Password"
                margin="normal"
                required
                size="small"
                fullWidth
                error={touched.password && !!errors.password}
                sx={{ mt: 2, width: '300px' }}
              />
              <ErrorMessage style={{fontSize:"13px",marginRight:"160px"}}  name="password" component="div" sx={{ color: 'red' }} />

              <Field
                as={TextField}
                type="password"
                name="confirmpassword"
                label="Confirm Password"
                margin="normal"
                required
                size="small"
                fullWidth
                error={touched.confirmpassword && !!errors.confirmpassword}
                sx={{ mb: 4, mt: 2, height: '10px', width: '300px' }}
              />
              
              <ErrorMessage style={{fontSize:"13px",marginRight:"110px"}}  name="confirmpassword" component="p" sx={{ color: 'red'}} />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2, width: '300px' }}>
                {!isLoading?"Register":<img style={{width:"30px",height:"25px"}} src={Loading}/>}
              </Button>
              <p style={{color:"red"}}>{registerationError?registerationError:''}</p>
              <p style={{color:"green"}}>{message}</p>
            </Box>
         
        )}
      </Formik>

      <Outlet />
    </AuthLayout>
  );
}
