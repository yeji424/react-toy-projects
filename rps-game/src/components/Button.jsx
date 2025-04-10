import React from 'react'
import btnStyles from '../css/Button.module.css'

const Button = ({ choiceKey, choice, onClick, disabled }) => {
  return (
    <button className={btnStyles.button} onClick={() => onClick(choiceKey)} disabled={disabled}>
      <img className={btnStyles.buttonImg} src={choice.img} alt={choice.name} />
      {choice.name}
    </button>
  )
}

export default Button
