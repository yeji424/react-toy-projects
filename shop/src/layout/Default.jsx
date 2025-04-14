import React from 'react'
import Header from '@/organism/Header'
import Footer from '@/organism/Footer'
import { Outlet } from 'react-router-dom'

const Default = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Default
