import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import {validateCookie } from "../functions/validateCookie"
// import {  useSelector } from 'react-redux';
const PrivateRoute = () => {
    // const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn.isUserLoggedIn);
console.log(validateCookie(),"validate cookie");
 return  validateCookie() ? <Outlet /> : <Navigate to={"/login"} />

};

export default PrivateRoute;
