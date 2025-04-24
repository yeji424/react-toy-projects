import BoardInput from '@/components/BoardInput'
import BoardList from '@/components/BoardList'
import BoardSearch from '@/components/BoardSearch'
import React from 'react'

const BoardPage = () => {
  return (
    <main>
      <BoardSearch />
      <BoardInput />
      <BoardList />
    </main>
  )
}

export default BoardPage
