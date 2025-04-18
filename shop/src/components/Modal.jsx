import React, { useEffect, useState } from 'react'
import style from './Modal.module.css'
import { formatCurrency } from '@/utils/features'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '@/api/cartApi'
const Modal = ({ product, count, onClose }) => {
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true)
      document.body.style.overflow = 'hidden' /* 스크롤 방지 */
    }, 5)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleClose = () => {
    setIsActive(false)
    setTimeout(onClose, 200)
  }

  const handleAddToCart = async () => {
    // 장바구니 상품 json-server에 추가
    // cartItem = {} 이 객체는
    // 장바구니 페이지로 이동
    // navigate랑 link to랑 차이 알아보기

    try {
      const cartItem = {
        id: product.id,
        title: product.title,
        img: product.img,
        price: product.price,
        category: product.category,
        discount: product.discount,
        count: count,
      }
      await addToCart(cartItem)
      handleClose()
      navigate('/cart')
    } catch (e) {
      console.log('error | ', e)
    }
  }

  return (
    <div className={`${style.modal}  ${isActive ? style.active : ''}`}>
      <div className={`${style.con}`}>
        <div className={style.inner}>
          <h2>Cart</h2>
          <div className={style.imgWrap}>
            <img src={`/img/${product.img}`} alt={product.title} />
          </div>
          <div className={style.info}>
            <p>{product.title}</p>
            <p>{formatCurrency(product.price)}</p>
            {product.discount > 0 && <p>{product.discount}%</p>}
            <p>{count}</p>
            <p>Total Price : {formatCurrency(product.price * count)}</p>
          </div>
          <button>X</button>
          <button onClick={handleAddToCart}>Add Cart</button>
        </div>
        <button className={style.btnClose} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  )
}

export default Modal
