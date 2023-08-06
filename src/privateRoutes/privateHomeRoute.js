import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import {getCookie} from '../functions/getCookie';
import {validateCookie } from "../functions/validateCookie"
import Login from "../pages/authentication/Login/LoginPage"
import {  useSelector } from 'react-redux';
const PrivateRoute = () => {
    const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn.isUserLoggedIn);
console.log(validateCookie(),"validate cookie");
 return  validateCookie() ? <Outlet /> : <Navigate to={"/login"} />

};

export default PrivateRoute;
