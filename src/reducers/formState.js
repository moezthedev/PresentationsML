import { createSlice } from '@reduxjs/toolkit'

export const formState = createSlice({
  name: 'formState',
  initialState: {
    
    formState: null
  },
  reducers: {
    setFormState: (state, action) => {
      state.formState = action.payload;
    }
  }
})

export const { setFormState } = formState.actions;

export default formState.reducer;
