import React from 'react'
import cardStyles from '../css/Card.module.css'
import questionmarkImg from '../assets/questionmark.png'

const Card = ({ userTitle, choice, result, type }) => {
  const getResultClass = () => {
    if (!result) return ''
    if (result === '비겼다 한 판 더!') return cardStyles.draw
    if (
      (type === 'user' && result === '이겼다! 연승 가보자고~') ||
      (type === 'computer' && result === '졌다.. 복수전 가자')
    ) {
      return cardStyles.win
    }
    return cardStyles.lose
  }

  return (
    <div className={`${cardStyles.card} ${getResultClass()}`}>
      <h2>{userTitle}</h2>
      {choice ? (
        <>
          <img src={choice.img} alt={choice.name} />
          <p>{choice.name}</p>
        </>
      ) : (
        <>
          <img src={questionmarkImg} alt="?" />
          <p>선택 전</p>
        </>
      )}
    </div>
  )
}

export default Card
