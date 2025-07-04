import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUserInfo } = user.actions
