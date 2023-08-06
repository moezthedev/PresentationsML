
import formState from "../formState";
import isUserLoggedIn from "../isUserLoggedIn"
import userToken from "../userToken"
import userData from "../userData"
import isLoading from "../isLoading";
const rootReducer = {
   formState:formState,
   isUserLoggedIn:isUserLoggedIn,
   userToken:userToken,
   userData:userData,
   isLoading:isLoading
};

export default rootReducer