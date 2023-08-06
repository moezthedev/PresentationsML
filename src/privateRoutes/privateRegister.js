import React from 'react';
import {  Outlet } from 'react-router-dom';
import {validateCookie } from "../functions/validateCookie"
import Home from "../pages/Home/Home"
import { useDispatch, useSelector } from 'react-redux';
const PrivateRoute = () => {
    

 return  !validateCookie() ? <Outlet/> : <Home/>

};

export default PrivateRoute;
