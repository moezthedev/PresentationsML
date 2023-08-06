import {getCookie} from './getCookie';
export const validateCookie =()=>{
    if (getCookie("userToken")){
        return true}
       else if(!getCookie("userToken")){
            return false
        }
    
}