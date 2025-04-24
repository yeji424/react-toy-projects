import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter', // 고유해야함, 보통 상태 이름 그대로 사용
  initialState: {
    count: 0,
    label: '카운터',
  },
  reducers: {
    increment: (state, action) => {
      state.count += action.payload || 1
    },
    decrement: state => {
      state.count -= 1
    },
  },
})

// 만약 export 안했다면?
// export default counterSlice.reducer 로 내보내기 하면 됨

// 이렇게 만든 걸 store에다가 연결하면 됨

// 규칙??
export const { increment } = counterSlice.actions
export const { decrement } = counterSlice.actions
