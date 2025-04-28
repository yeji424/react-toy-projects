import React from 'react'
import MenuList from './MenuList'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <MenuList />
      <Outlet />
    </>
  )
}

export default MainLayout
