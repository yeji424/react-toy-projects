import React, { useState } from 'react'
import css from './RegisterPage.module.css'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../apis/userApi'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [checkPwd, setCheckPwd] = useState('')
  const [errUsername, setErrUsername] = useState('')
  const [errPwd, setErrPwd] = useState('')
  const [errCheckPwd, setErrCheckPwd] = useState('')
  const [registerState, setRegisterState] = useState('')

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
  const validateCheckPwd = (value, current = pwd) => {
    if (!value) {
      setErrCheckPwd(' ')
      return
    }
    if (value !== current) {
      setErrCheckPwd('패스워드가 일치하지 않습니다.')
    } else {
      setErrCheckPwd('')
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
  const handleCheckPwdChange = e => {
    const value = e.target.value
    setCheckPwd(value)
    validateCheckPwd(value)
  }

  const register = async e => {
    e.preventDefault()
    console.log('회원가입 ---', username, pwd, checkPwd)
    validateUsername(username)
    validatePwd(pwd)
    validateCheckPwd(checkPwd)
    if (errUsername || errPwd || errCheckPwd || !username || !pwd || !checkPwd) {
      return
    }

    try {
      setRegisterState('등록중')

      const response = await registerUser({
        username,
        pwd,
      })

      console.log('회원가입 성공', response.data)
      setRegisterState('등록완료')
      navigate('/login')
    } catch (e) {
      console.log('회원가입 실패 ERROR | ', e)
      if (e.response) {
        // 서버가 응답을 반환한 경우
        console.log('오류 응답 데이터 --', e.response.data)
      }
    }
  }

  return (
    <main className={css.registerpage}>
      <h2>회원가입 페이지</h2>
      {registerState && <strong>{registerState}</strong>}
      <form className={css.container} onSubmit={register}>
        <input
          type="text"
          placeholder="사용자명"
          value={username}
          onChange={handleUsernameChange}
        />
        <strong>{errUsername}</strong>
        <input type="password" placeholder="비밀번호" value={pwd} onChange={handlePwdChange} />
        <strong>{errPwd}</strong>
        <input
          type="password"
          placeholder="패스워드 확인"
          value={checkPwd}
          onChange={handleCheckPwdChange}
        />
        <strong>{errCheckPwd}</strong>
        <button type="submit">가입하기</button>
      </form>
    </main>
  )
}

export default RegisterPage
