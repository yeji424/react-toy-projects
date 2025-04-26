import Counter from '@/components/Counter'
import { decrement, increment } from '@/store/counterSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

const AboutPage = () => {
  const dispatch = useDispatch()
  const increase = num => {
    dispatch(increment(num))
  }
  const decrease = () => {
    dispatch(decrement())
  }
  return (
    <main>
      <h2>AboutPage</h2>
      <Counter />
      <Counter />
      <Counter />
      <button
        onClick={() => {
          increase()
        }}
      >
        1 증가
      </button>
      <button
        onClick={() => {
          increase(10)
        }}
      >
        10 증가
      </button>
      <button onClick={decrease}>1 감소</button>
    </main>
  )
}

export default AboutPage
