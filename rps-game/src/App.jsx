import React, { useState } from 'react'
import rock from './assets/rock.png'
import paper from './assets/paper.png'
import scissors from './assets/scissors.png'
import Card from './components/Card'
import Button from './components/Button'
import css from './css/App.module.css'

const choice = {
  rock: {
    name: '바위',
    img: rock,
  },
  paper: {
    name: '보',
    img: paper,
  },
  scissors: {
    name: '가위',
    img: scissors,
  },
}

const App = () => {
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  // 승패 판정 함수
  const determineWinner = (user, computer) => {
    if (user.name === computer.name) return '비겼다 한 판 더!'
    if (
      (user.name === '가위' && computer.name === '보') ||
      (user.name === '바위' && computer.name === '가위') ||
      (user.name === '보' && computer.name === '바위')
    ) {
      return '이겼다! 연승 가보자고~'
    } else {
      return '졌다.. 복수전 가자'
    }
  }

  // 컴퓨터 랜덤 선택 함수
  const generateComputerChoice = () => {
    const keys = Object.keys(choice)
    const randomIndex = Math.floor(Math.random() * keys.length)
    return choice[keys[randomIndex]]
  }

  // 사용자 선택 처리 함수
  const handleUserChoice = selected => {
    if (isPlaying) return
    setIsPlaying(true)

    const userSelected = choice[selected]
    const computerSelected = generateComputerChoice()
    const gameResult = determineWinner(userSelected, computerSelected)

    setUserChoice(userSelected)
    setComputerChoice(computerSelected)
    setResult(gameResult)
  }

  // 리플레이 처리 함수
  const handleReplay = () => {
    setUserChoice(null)
    setComputerChoice(null)
    setResult('')
    setIsPlaying(false)
  }

  return (
    <>
      <div className={css.container}>
        <h1>가위바위보 게임</h1>
        <div>
          <Card userTitle="나" choice={userChoice} result={result} type="user" />
          <div className={css.button_group}>
            {Object.entries(choice).map(([key, value]) => (
              <Button
                key={key}
                choiceKey={key}
                choice={value}
                onClick={handleUserChoice}
                disabled={!!result}
              />
            ))}
          </div>
          <Card userTitle="컴퓨터" choice={computerChoice} result={result} type="computer" />
        </div>
      </div>
      {!userChoice && !computerChoice && (
        <p className={css.info}>
          버튼을 클릭하여 가위, 바위, 보 중 하나를 선택하세요.
          <br />
          컴퓨터는 랜덤으로 선택합니다.
        </p>
      )}
      {result && userChoice && computerChoice && (
        <div className={css.overlay}>
          <div className={css.popup}>
            <h2>{result}</h2>
            <button className={css.replay_btn} onClick={handleReplay}>
              다시하기
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
