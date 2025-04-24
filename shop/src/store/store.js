import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counterSlice'
import { themeSlice } from './themeSlice'
import { boardSlice } from './boardSlice'

export default configureStore({
  reducer: {
    counter: counterSlice.reducer,
    theme: themeSlice.reducer,
    board: boardSlice.reducer,
  },
})
