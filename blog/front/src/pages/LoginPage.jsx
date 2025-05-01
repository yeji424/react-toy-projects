import { useState, useEffect } from 'react'
import css from './registerpage.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../store/userSlice'
import { loginUser } from '../apis/userApi'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [errUsername, setErrUsername] = useState('')
  const [errPwd, setErrPwd] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const [redirect, setRedirect] = useState(false) // 로그인 상태 메세지

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validateUsername = value => {
    if (!value) {
      setErrUsername('')
      return
    }
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(value)) {
      setErrUsername('사용자명은 영문자로 시작하는 단어여야 합니다.')
    } else {
      setErrUsername('')
    }
  }
  const validatePwd = value => {
    if (!value) {
      setErrPwd('')
      return
    }
    if (value.length < 4) {
      setErrPwd('비밀번호는 4자 이상이어야 합니다')
    } else {
      setErrPwd('')
    }
  }
  const handleUsernameChange = e => {
    const value = e.target.value
    setUsername(value)
    validateUsername(value)
  }
  const handlePwdChange = e => {
    const value = e.target.value
    setPwd(value)
    validatePwd(value)
  }

  const login = async e => {
    e.preventDefault()
    console.log('로그인 시도 중')
    setLoginStatus('')
    validateUsername(username)
    validatePwd(pwd)
    if (errPwd || errUsername || !username || !pwd) {
      setLoginStatus('아이디와 비밀번호를 확인해주세요.')
      return
    }
    try {
      const userData = await loginUser({ username, pwd })

      if (userData) {
        setLoginStatus('로그인 성공')
        dispatch(setUserInfo(userData))
        setTimeout(() => {
          setRedirect(true)
        }, 1000)
      } else {
        console.log('----')
      }
    } catch (e) {
      console.error('로그인 오류---', e)
      return
    } finally {
      setLoginStatus(false)
    }
  }

  useEffect(() => {
    if (redirect) {
      navigate('/')
    }
  }, [redirect, navigate])
  return (
    <main className={css.loginpage}>
      <h2>로그인</h2>
      {loginStatus && <strong>{loginStatus}</strong>}
      <form className={css.container} onSubmit={login}>
        <input type="text" placeholder="아이디" value={username} onChange={handleUsernameChange} />
        <strong>{errUsername}</strong>
        <input type="password" placeholder="비밀번호" value={pwd} onChange={handlePwdChange} />
        <strong>{errPwd}</strong>

        <button type="submit">로그인</button>
      </form>
    </main>
  )
}

export default LoginPage
