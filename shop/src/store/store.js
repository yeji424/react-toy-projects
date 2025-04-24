import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counterSlice'
import { themeSlice } from './themeSlice'

export default configureStore({
  reducer: {
    counter: counterSlice.reducer,
    theme: themeSlice.reducer,
  },
})
