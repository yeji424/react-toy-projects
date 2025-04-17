import React from 'react'
import { Link } from 'react-router-dom'
import style from './ProductCard.module.css'
import { formmatCurrency } from '../utils/features'

const ProductCard = ({ data }) => {
  return (
    <div className={style.card}>
      <div className={style.imgWrap}>
        <img src={`/img/${data.img}`} alt={data.title} />
        <span className={style.cate}>{data.category}</span>
        {data.discount > 0 && <span className={style.discount}>{data.discount}%</span>}
      </div>
      <div className={style.textWrap}>
        <strong className={style.title}>{data.title}</strong>
        <span className={style.price}>{formmatCurrency(data.price)}</span>
      </div>
      <Link to={`/detail/${data.id}`} className={style.btnGoDetail}></Link>
    </div>
  )
}

export default ProductCard
