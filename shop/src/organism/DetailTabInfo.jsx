import React, { useState } from 'react'
import style from './DetailTabInfo.module.css'
import DetailTabContent from '@/components/DetailTabContent'

const DetailTabInfo = () => {
  const [tabActive, setTabActive] = useState(0)
  const tabLabels = ['menu1', 'menu2', 'menu3']
  return (
    <>
      <div className={style.tabBtnWrap}>
        {tabLabels.map((labels, idx) => (
          <button
            key={idx}
            className={tabActive == idx ? style.active : ''}
            onClick={() => setTabActive(idx)}
          >
            {labels}
          </button>
        ))}
      </div>
      <DetailTabContent selectedTab={tabActive} />
    </>
  )
}

export default DetailTabInfo
