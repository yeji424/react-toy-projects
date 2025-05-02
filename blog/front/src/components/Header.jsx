import { NavLink, Link } from 'react-router-dom'
import css from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserProfile, logoutUser } from '../apis/userApi'
import { setUserInfo } from '../store/userSlice'

export const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const username = user?.username
  console.log(username)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const userData = await getUserProfile()
        dispatch(setUserInfo(userData))
      } catch (err) {
        console.log(err)
        dispatch(setUserInfo(''))
      }
    }
    getProfile()
  }, [dispatch])

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(setUserInfo(''))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header className={css.header}>
      <h1>
        <Link to={'/'}>TOKTOKLOG</Link>
      </h1>
      <nav>
        {username ? (
          <>
            <MenuLink to="/create" label="글쓰기" />
            <button onClick={handleLogout}>로그아웃</button>
            <span>{username}</span>
          </>
        ) : (
          <>
            <MenuLink to="/login" label="로그인" />
            <MenuLink to="/register" label="회원가입" />
          </>
        )}
      </nav>
    </header>
  )
}

const MenuLink = ({ to, label }) => {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? css.active : '')}>
      {label}
    </NavLink>
  )
}
