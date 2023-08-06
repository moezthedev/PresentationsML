import { createSlice } from '@reduxjs/toolkit'

export const isUserLoggedIn = createSlice({
  name: 'isUserLoggedIn',
  initialState: {
    
    isUserLoggedIn: false
  },
  reducers: {
    setisUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    }
  }
})

export const { setisUserLoggedIn} = isUserLoggedIn.actions;

export default isUserLoggedIn.reducer;
