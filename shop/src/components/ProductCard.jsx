import React from 'react'
import { Link } from 'react-router-dom'
import style from './ProductCard.module.css'
const ProductCard = () => {
  return (
    <div className={style.card}>
      <div className={style.imgWrap}>
        <img src="/public/img/image1.jpg" alt="상품아이디" />
      </div>
      <div className={style.textWrap}>
        <strong>상품명</strong>
        <span>가격</span>
      </div>
      <Link to={'/shop'}>상품 상세 페이지</Link>
    </div>
  )
}

export default ProductCard
