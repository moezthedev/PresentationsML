import React from 'react';
import {  Outlet } from 'react-router-dom';
import {validateCookie } from "../functions/validateCookie"
import Home from "../pages/Home/Home"
const PrivateRoute = () => {
    

 return  !validateCookie() ? <Outlet/> : <Home/>

};

export default PrivateRoute;
