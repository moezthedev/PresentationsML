import { createSlice } from '@reduxjs/toolkit'

export const isLoading = createSlice({
  name: 'isLoading',
  initialState: {
    
    isLoading: false
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
})

export const { setIsLoading } = isLoading.actions;

export default isLoading.reducer;
