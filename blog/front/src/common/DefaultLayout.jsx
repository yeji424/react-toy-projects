import React from 'react'
import css from './DefaultLayout.module.css'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
const DefaultLayout = () => {
  return (
    <main className={css.defaultlayout}>
      <Header />
      <Outlet />
      <footer>카피라이트 영역</footer>
    </main>
  )
}

export default DefaultLayout
