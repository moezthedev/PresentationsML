import React from 'react'
import { removeCookie } from '../../functions/removeCookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFormState} from '../../reducers/formState';
import { setUserData} from '../../reducers/userData';
import { setUserToken } from '../../reducers/userToken';
import Navbar from '../../components/navbar/navbar';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';
import FeatureCards from '../../components/features/features';
import Slider from '../../components/Slider/slider';
import Video from '../../components/video/video';
import {setisUserLoggedIn} from "../../reducers/isUserLoggedIn";
import Faq from "../../components/faq/faq"
import { useAutoAnimate } from '@formkit/auto-animate/react'

const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userData.userData);
let name = userData.name?userData.name:''
let email =  userData.email?userData.email:''
const navigate = useNavigate()
const [parent] = useAutoAnimate();
const handleLogout = ()=>{
  removeCookie("userToken")
  dispatch(setFormState(""))
  dispatch(setisUserLoggedIn(false))
  dispatch(setUserToken(""))
  dispatch(setUserData(""))
  navigate("/login")
}
  return (
    <div >
      
      
<Navbar handleLogout={handleLogout} name={name}/>
<Header/>
<FeatureCards/>
<Slider/>
<Video/>
<Footer/>

      </div>
  )
}

export default Home