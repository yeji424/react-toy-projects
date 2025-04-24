import { getBoardData } from '@/api/boardApi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const board = [
//   {
//     id: 1,
//     boardDesc: '내용 입력 되는 곳',
//     createAt: '2025.04.24',
//     isDone: false,
//   },
//   {
//     id: 2,
//     boardDesc: '222내용 입력 되는 곳',
//     createAt: '2025.04.25',
//     isDone: false,
//   },
// ]

export const fetchBoard = createAsyncThunk('board/fetchBoard', async () => {
  const res = await getBoardData()
  return res
})
export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: [],
    status: 'idle', // 'idle' | 'loading | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBoard.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.board = action.payload
        state.error = null
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
