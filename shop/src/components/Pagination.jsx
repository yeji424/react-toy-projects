import React from 'react'
import style from './Pagination.module.css'
const Pagination = ({ initProductsData }) => {
  // console.log('Pagenation:initProductsData', initProductsData.products.last)
  return (
    <div className={style.paginationArea}>
      <button>
        <i className="bi bi-chevron-left"></i>
      </button>
      <button>1</button>
      <button>2</button>
      <button className={style.active}>3</button>
      <button>4</button>
      <button>5</button>
      <button>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  )
}

export default Pagination
