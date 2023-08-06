import  React,{useEffect, useState} from 'react';
import { Formik,  Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AuthLayout from '../AuthLayout';
import { useNavigate,Outlet,useLocation} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux/';
import { setIsLoading } from '../../../reducers/isLoading';
import { Link } from 'react-router-dom';
import Loading from "../../../images/ripple.gif"
import axios from "axios"
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  name:Yup.string().required("Name is required"),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'At least 8 characters')
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
const [resetKeyValue,setResetKeyValue] = useState("")
const [click,setClick] = useState(false)
const [message, setMessage] = useState("")
const isLoading = useSelector((state) => state.isLoading.isLoading);
const dispatch = useDispatch()
  const navigate = useNavigate();

 
 
  const handleSubmit = async(event) => {
    event.preventDefault();
    setClick(true)
    const passwordRegister = event.target.elements.password.value;
    const confirmPasswordRegister = event.target.elements.password.value;
    if(resetKeyValue!==""&&passwordRegister!==""||confirmPasswordRegister!==""){
        try {
          dispatch(setIsLoading(true))
            const response = await axios.post('https://general-api-ovypaunneq-uc.a.run.app/api/v1/password-reset', {
              password: passwordRegister,
              reset_id: resetKeyValue,
            });
      
         setMessage(response.data.message)
            console.log(response.data.message);
            dispatch(setIsLoading(false))
          } catch (error) {
           
            console.error('Error:', error);
            setRegistrationError(error.message)
            dispatch(setIsLoading(false))
          }

    }
    else{
        setRegistrationError("Key is not valid")
    }
  };
  const location = useLocation(); 
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const key = searchParams.get('key');
  
    setResetKeyValue(key)
  }, [location.search]);
  console.log(resetKeyValue,"resetkey");
  return (
    <AuthLayout>
      <Typography component="h1" variant="h4" sx={{ mb: 1, mt: 15, fontWeight: 'bold', textAlign: 'center' }}>
        Password Reset
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
          
            <Box  component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, textAlign: 'center' }}>
            
              <Field
                as={TextField}
                type="password"
                name="password"
                label="Password"
                margin="normal"
                required
                size="small"
                fullWidth
                error={touched.password && !!errors.password &&click}
                sx={{ mt: 2, width: '300px' }}
              />
             {click?<ErrorMessage style={{fontSize:"13px",marginRight:"160px"}}  name="password" component="div" sx={{ color: 'red' }} />:""} 

              <Field
                as={TextField}
                type="password"
                name="confirmpassword"
                label="Confirm Password"
                margin="normal"
                required
                size="small"
                fullWidth
                error={touched.confirmpassword && !!errors.confirmpassword && click}
                sx={{ mb: 4, mt: 2, height: '10px', width: '300px' }}
              />
              
             {click?<ErrorMessage style={{fontSize:"13px",marginRight:"110px"}}  name="confirmpassword" component="p" sx={{ color: 'red'}} />:""} 

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 2, width: '300px' }}>
               {!isLoading?"Reset Password":<img style={{width:"30px",height:"25px"}} src={Loading}/>} 
              </Button>
              <p style={{color:"red"}}>{registerationError?registerationError:""}</p>
             <p style={{color:"green"}}>{message}</p>
            </Box>

        )}
      </Formik>

      <Outlet />
    </AuthLayout>
  );
}
