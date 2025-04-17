import React from 'react'
import { useLoaderData } from 'react-router-dom'
import style from './DetailPage.module.css'
import { formmatCurrency } from '@/utils/features'

const DetailPage = () => {
  const { product, relatedProducts } = useLoaderData()
  console.log('DetailPage:product', product)
  console.log('DetailPage:relatedProducts', relatedProducts)

  return (
    <main>
      <h2>DetailPage</h2>
      <div className={style.detailCon}>
        <div className={style.imgWrap}>
          <img src={`/public/img/${product.img}`} alt={product.title} />
          {product.discount > 0 && <p className={style.discount}>{product.discount} %</p>}
        </div>
        <div className={style.infoWrap}>
          <p className={style.title}>{product.title}</p>
          <p className={style.price}>{formmatCurrency(product.price)}</p>
          <p className={style.category}>{product.category}</p>
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
      <div>Tab Menu</div>
      <div>Relaive Prudocts</div>
    </main>
  )
}

export default DetailPage
