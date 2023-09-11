
import './App.css';
import Login from "./pages/authentication/Login/LoginPage"
import Register from "./pages/authentication/Register/Register"
import Home from "./pages/Home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './privateRoutes/privateHomeRoute';
import PrivateRegister from './privateRoutes/privateRegister';
import React, { useEffect } from 'react';
import axios from 'axios';
import { setUserData} from './reducers/userData';
import { getCookie } from './functions/getCookie';
import {  useSelector,useDispatch } from 'react-redux';
import PasswordReset from './pages/authentication/PasswordReset/passwordReset';
import ConfirmPassword from './pages/authentication/ConfirmPassword/confirmPassword';
import VerifyEmail from './pages/authentication/verifyEmail/verifyEmail';
import isUserLoggedIn from './reducers/isUserLoggedIn';
import Main from './pages/Main/main';

function App() {
  const dispatch = useDispatch()
  const userToken = useSelector((state) => state.userToken.userToken);
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "https://general-api-ovypaunneq-uc.a.run.app/api/v1/user",
          {
            headers: {
              Authorization: `Bearer ${getCookie("userToken")}`,
            },
          }
        );

        const { created_at, email, name, role, username } = response.data;
        console.log("respone data",response.data);
        const userData = {
          created_at,
          email,
          name,
          role,
          username,
        };
dispatch(setUserData(userData))
dispatch(isUserLoggedIn(true))
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    getUserData();
  }, [userToken]);
  return (
    <div>
      <Router>
      <Routes>
      {/* <Route element={<PrivateRoute />}> */}
        
          <Route path="/" element={<Home />} />
          {/* </Route> */}
          <Route element={<PrivateRegister />}>
      <Route  path="/register" element={<Register/>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path='/enter-email' element={<PasswordReset/>}/>
      <Route path='/reset-password' element={<ConfirmPassword/>}/>
      <Route path='/verify-email' element={<VerifyEmail/>}/>
      <Route path='/app' element={<Main/>}/>
      </Routes>
      </Router>

    </div>
  );
}

export default App;
