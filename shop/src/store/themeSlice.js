import { createSlice } from '@reduxjs/toolkit'

const savedTheme = localStorage.getItem('theme')
const isDarkMode = savedTheme !== null ? JSON.parse(savedTheme) : false

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode, // key랑 value가 똑같기 때문에 생략 가능
  },
  reducers: {
    toggleTheme: state => {
      state.isDarkMode = !state.isDarkMode
    },
    // setTheme: (state, active) => {
    //   state.isDarkMode - active.payload
    // },
  },
})

export const { toggleTheme } = themeSlice.actions
