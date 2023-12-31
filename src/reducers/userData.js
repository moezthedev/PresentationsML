import { createSlice } from '@reduxjs/toolkit'

export const userData = createSlice({
  name: 'userData',
  initialState: {
    
    userData: ""
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    }
  }
})

export const { setUserData } = userData.actions;

export default userData.reducer;
