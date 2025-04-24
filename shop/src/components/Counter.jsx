import React from 'react'
import { useSelector } from 'react-redux'

const Counter = () => {
  const countData = useSelector(state => state.counter)
  const { count, label } = countData
  console.log('countData ---', count, label)
  return (
    <p>
      {label} : {count}
    </p>
  )
}

export default Counter
