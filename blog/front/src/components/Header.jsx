import { NavLink, Link } from 'react-router-dom'
import css from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserProfile } from '../apis/userApi'
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
      } catch (e) {
        console.error(e)
        dispatch(setUserInfo(''))
      }
    }
    getProfile()
  }, [dispatch])

  return (
    <header className={css.header}>
      <h1>
        <Link to={'/'}>TOKTOKOLOG</Link>
      </h1>
      <nav>
        {user ? (
          <div>
            <button>글쓰기</button>
            <button>로그아웃</button>
            <span>{user.username}</span> {/* user.username으로 접근 */}
          </div>
        ) : (
          <div>
            <MenuLink to="/login" label="로그인" />
            <MenuLink to="/register" label="회원가입" />
          </div>
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
