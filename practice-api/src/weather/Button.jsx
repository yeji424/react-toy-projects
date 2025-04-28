import React from 'react'

export const Button = ({ city, label, onClick }) => {
  return <button onClick={() => onClick(city)}>{label}</button>
}
