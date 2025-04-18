import React from 'react'
import style from '@/organism/DetailTabInfo.module.css'

const DetailTabContent = ({ selectedTab }) => {
  const contentMap = {
    0: (
      <>
        <h3>제목 1</h3>
        <p>내용 1</p>
        <p>내용 1</p>
        <p>내용 1</p>
      </>
    ),
    1: (
      <>
        <h3>제목 2</h3>
        <p>내용 2</p>
        <p>내용 2</p>
        <p>내용 2</p>
      </>
    ),
    2: (
      <>
        <h3>제목 3</h3>
        <p>내용 3</p>
        <p>내용 3</p>
        <p>내용 3</p>
      </>
    ),
  }

  return <div className={`${style.tabContentWrap} ${style.visible}`}>{contentMap[selectedTab]}</div>
}

export default DetailTabContent
