import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import style from './Header.module.css'
import Logo from '../components/Logo'
import { useEffect, useState } from 'react'

const Header = () => {
  const [isOn, setIsOn] = useState(false)
  const location = useLocation() // 정리하기
  const addClassOn = () => {
    setIsOn(!isOn)
  }

  useEffect(() => {
    setIsOn(false)
  }, [location.pathname])

  const handleResize = () => {
    if (window.innerWidth > 1100) {
      setIsOn(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header className={style.hd}>
      <div className={style.con}>
        <h1>
          <Link to={'/'}>
            <Logo />
          </Link>
        </h1>

        <div className={isOn ? `${style.gnb} ${style.on}` : style.gnb}>
          <nav>
            <CustomNavLink to={'/shop'} label={'shop'} />
            <CustomNavLink to={'/about'} label={'about'} />
            <CustomNavLink to={'/blog'} label={'blog'} />
          </nav>
          <div className={style.icon}>
            <CustomIconLink to={'/search'} icon={'bi-search'} />
            <CustomIconLink to={'/mypage'} icon={'bi-person-circle'} />
            <CustomIconLink to={'/cart'} icon={'bi-basket'} />
          </div>
        </div>
        <i className={`${style.ham} bi bi-list`} title="Full-menu-btn" onClick={addClassOn}></i>
      </div>
    </header>
  )
}

const CustomNavLink = ({ to, label }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? `${style.active}` : '')}>
    {label}
  </NavLink>
)
const CustomIconLink = ({ to, icon }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? `${style.active}` : '')}>
    <i className={`bi ${icon}`}></i>
  </NavLink>
)
export default Header
