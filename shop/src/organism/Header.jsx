import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import style from './Header.module.css'
import Logo from '../components/Logo'
import { useEffect, useState } from 'react'
import { throttle } from '../utils/features'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '@/store/themeSlice'

const Header = () => {
  const [isOn, setIsOn] = useState(false) // 햄버거 메뉴 열림 여부 상태
  const location = useLocation() // 현재 경로 정보 가져오기

  // 햄버거 아이콘 클릭 이벤트 :메뉴 열기/닫기 토글
  const addClassOn = () => {
    setIsOn(!isOn)
  }

  // 메뉴 닫기 조건 1 : 경로가 바뀔 때마다 자동 닫기
  useEffect(() => {
    setIsOn(false)
  }, [location.pathname])

  // 메뉴 닫기 조건 2 : 화면 크기 1100px 이상으로 변경되면 자동 닫기
  const handleResize = throttle(() => {
    if (window.innerWidth > 1100) {
      setIsOn(false)
    }
  }, 1000)

  // 리사이즈 이벤트 등록 및 해제
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  // dark mode
  // const [isDarkMode, setIsDarkMode] = useState(false)
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('theme')
  //   if (savedTheme !== null) {
  //     const parsedTheme = JSON.parse(savedTheme) // 파싱을 위함
  //     setIsDarkMode(parsedTheme)
  //     document.body.classList.toggle('dark-mode', parsedTheme)
  //   }
  // }, [])

  // const handleThemeToggle = () => {
  //   const newTheme = !isDarkMode
  //   setIsDarkMode(newTheme)
  //   localStorage.setItem('theme', JSON.stringify(newTheme))
  //   document.body.classList.toggle('dark-mode', newTheme)
  // }

  const dispatch = useDispatch()

  const { isDarkMode } = useSelector(state => state.theme)

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode))

    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <header className={style.hd}>
      <div className={style.con}>
        <h1>
          <Link to={'/'}>
            <Logo />
          </Link>
        </h1>
        {/* 메뉴 영역 - isOn이 true면 .on 클래스 추가 */}
        <div className={isOn ? `${style.gnb} ${style.on}` : style.gnb}>
          <nav>
            <CustomNavLink to={'/shop'} label={'shop'} />
            <CustomNavLink to={'/about'} label={'about'} />
            <CustomNavLink to={'/blog'} label={'blog'} />
            <CustomNavLink to={'/board'} label={'board'} />
          </nav>
          <div className={style.icon}>
            <CustomIconLink to={'/search'} icon={'bi-search'} />
            <CustomIconLink to={'/mypage'} icon={'bi-person-circle'} />
            <CustomIconLink to={'/cart'} icon={'bi-basket'} />
            <i
              className={`p-2 bi bi-${isDarkMode ? 'moon' : 'sun'}`}
              style={{ cursor: 'pointer' }}
              onClick={handleThemeToggle}
            ></i>
          </div>
        </div>
        {/* 햄버거 버튼 */}
        <i className={`${style.ham} bi bi-list`} title="Full-menu-btn" onClick={addClassOn}></i>
      </div>
    </header>
  )
}

// 메뉴 링크용 컴포넌트 : 현재 페이지면 active 클래스 추가
const CustomNavLink = ({ to, label }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? `${style.active}` : '')}>
    {label}
  </NavLink>
)

// 아이콘 링크용 컴포넌트 - 현재 페이지면 active 클래스 추가
const CustomIconLink = ({ to, icon }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? `${style.active}` : '')}>
    <i className={`bi ${icon}`}></i>
  </NavLink>
)
export default Header
