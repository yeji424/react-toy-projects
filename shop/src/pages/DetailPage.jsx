import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import style from './DetailPage.module.css'
import { formatCurrency } from '@/utils/features'
import DetailTabInfo from '@/organism/DetailTabInfo'
import RelatedProducts from '@/organism/RelatedProducts'
import Modal from '@/components/Modal'

const DetailPage = () => {
  const { product, relatedProducts } = useLoaderData()
  // const { isLoading, setIsLoading } = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [count, setCount] = useState(1)

  // console.log('DetailPage:product', product)
  // console.log('DetailPage:relatedProducts', relatedProducts)
  const decrease = () => {
    setCount(prev => (prev > 1 ? prev - 1 : 1))
  }
  const increase = () => {
    setCount(prev => prev + 1)
  }
  const handleAddToCart = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <main className={style.detailPage}>
      <h2>DetailPage</h2>
      <div className={style.detailCon}>
        <div className={style.imgWrap}>
          <img src={`/img/${product.img}`} alt={product.title} />
          {product.discount > 0 && <p className={style.discount}>{product.discount} %</p>}
        </div>
        <div className={style.infoWrap}>
          <p className={style.title}>{product.title}</p>
          <p className={style.price}>{formatCurrency(product.price)}</p>
          <p className={style.category}>{product.category}</p>
          <div className={style.btnWrap}>
            <div className={style.counterArea}>
              <button onClick={decrease}>-</button>
              <span>{count}</span>
              <button onClick={increase}>+</button>
            </div>
            <button className={style.addBtn} onClick={handleAddToCart}>
              Add Cart
            </button>
          </div>
        </div>
      </div>
      <DetailTabInfo />
      <RelatedProducts relatedProducts={relatedProducts} />
      {isModalOpen && <Modal product={product} count={count} onClose={closeModal} />}
    </main>
  )
}

export default DetailPage
