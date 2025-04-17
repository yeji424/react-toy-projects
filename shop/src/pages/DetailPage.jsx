import React from 'react'
import { useLoaderData } from 'react-router-dom'
import style from './DetailPage.module.css'

const DetailPage = () => {
  const { product, relatedProducts } = useLoaderData()
  console.log('DetailPage : product', product)
  console.log('DetailPage : relatedProducts', relatedProducts)

  return (
    <main>
      <h2> Detail Page</h2>
      <div className={style.detailCon}>
        <div className={style.imgWrap}>
          <img src="/img/image1.jpg" alt="상품명" />
        </div>
        <div className={style.infoWrap}>
          <p className={style.title}>pName</p>
          <p className={style.price}>pPrice</p>
          <p className={style.discount}>pDiscount</p>
          <p className={style.category}>pCategory</p>
          <div className={style.btnWrap}>
            <div className={style.counterArea}>
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <button className={style.addBtn}>Add Cart</button>
          </div>
        </div>
      </div>
      <div>Tap Menu</div>
      <div>Relative Products List</div>
    </main>
  )
}

export default DetailPage
