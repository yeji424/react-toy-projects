import React, { useState } from 'react'
import style from './ShopPage.module.css'

const ShopPage = () => {
  const [isDown, setIsDown] = useState(false)
  return (
    <main className={style.shopPage}>
      <h2>Shop All</h2>
      <div className={style.searchFn}>
        <div className={style.category}>
          <button className={style.active}>Al Items</button>
          <button>New Updates</button>
          <button>Top Items</button>
        </div>
        <div className={`${style.sort} ${isDown ? style.active : ''}`}>
          <div className={style.sortHeader} onClick={() => setIsDown(!isDown)}>
            <p>sort</p>
            <i className={`bi bi-chevron-${isDown ? 'up' : 'down'}`}></i>
          </div>
          <ul>
            <li>업데이트순</li>
            <li className={style.active}>낮은 가격순</li>
            <li>높은 가격순</li>
            <li>낮은 할인순</li>
            <li>높은 할인순</li>
          </ul>
        </div>
      </div>
      <div className={style.productList}>
        <ul className={style.list}>
          <li>Product List</li>
          <li>Product List</li>
          <li>Product List</li>
          <li>Product List</li>
          <li>Product List</li>
          <li>Product List</li>
          <li>Product List</li>
        </ul>
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
      </div>
    </main>
  )
}

export default ShopPage
