import React from 'react'
import css from './CampingPage.module.css'

const DetailModal = ({ selected, onClose }) => {
  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <h2>{selected['야영장명']}</h2>

        <div className={css.detailGrid}>
          <div>주소</div>
          <div>{selected['주소']}</div>

          <div>부대시설</div>
          <div>{selected['부대시설']}</div>

          <div>반려동물 출입 여부</div>
          <div>{selected['반려동물출입']}</div>

          <div>인허가일자</div>
          <div>{selected['인허가일자']}</div>
        </div>

        <button onClick={onClose}>✖</button>
      </div>
    </div>
  )
}

export default DetailModal
