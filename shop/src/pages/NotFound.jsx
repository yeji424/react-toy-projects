import React from 'react'
import { useRouteError } from 'react-router-dom'

const NotFound = () => {
  const err = useRouteError()
  return (
    <main>
      <h2>NotFound</h2>
      <p>
        {err.status === 404 ? '요청된 페이지를 찾을 수 없습니다.' : '잠시 후에 다시 실행해주세요'}
      </p>
      <p> {err.data || err.statusText}</p>
    </main>
  )
}

export default NotFound
