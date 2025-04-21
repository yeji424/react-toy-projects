import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import style from './CartPage.module.css'
import { formatCurrency } from '@/utils/features'
import { removeFromCart, updateCartItemCnt } from '@/api/cartApi'
const CartPage = () => {
  const cartList = useLoaderData()
  const [items, setItems] = useState(Array.isArray(cartList) ? cartList : [])
  console.log(items)

  // 총 수량 계산 : ruduce 고차함수 사용
  const totalCnt = items.reduce((sum, item) => sum + item.count, 0)

  // 총 금액
  const totalPrice = items.reduce(
    (sum, item) => sum + Math.round(item.price * item.count * (1 - item.discount / 100)),
    0
  )

  // 아이템 수량 증가
  const increase = id => {
    // UI 업데이트
    setItems(prev => prev.map(item => (item.id === id ? { ...item, count: item.count + 1 } : item)))

    // 서버 업데이트
    const newCnt = items.find(item => item.id === id).count + 1
    updateCartItemCnt(id, newCnt).catch(e => console.log('error', e))
  }
  // 아이템 수량 감소
  const decrease = id => {
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
      )
    )
    const newCnt = items.find(item => item.id === id).count - 1
    if (newCnt >= 1) {
      updateCartItemCnt(id, newCnt)
    }
  }

  const handleDelete = id => {
    if (window.confirm('해당 상품을 삭제하시겠습니까?')) {
      setItems(prev => prev.filter(item => item.id !== id))
      removeFromCart(id)
    }
  }
  return (
    <main>
      <h2>Shopping Cart</h2>
      {items.length > 0 && (
        <p>
          You have <strong>{items.length}</strong> items in your cart {totalCnt}
        </p>
      )}

      {items.length === 0 ? (
        <p className={style.empty}>Add some Items</p>
      ) : (
        <>
          <ul className={style.cartList}>
            {items.map(item => (
              <li key={item.id} className={style.cartItem}>
                <div className={style.cartImg}>
                  <img src={`/img/${item.img}`} alt={item.title} />
                </div>
                <div className={style.title}>{item.title}</div>
                <div className={style.price}>{formatCurrency(item.price)}</div>
                <div className={style.btnArea}>
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>
                <div className={style.sum}>{formatCurrency(item.price * item.count)}</div>
                <div className={style.deleteBtn} onClick={() => handleDelete(item.id)}>
                  <i className="bi bi-trash"></i>
                </div>
              </li>
            ))}
          </ul>
          <div className={style.totalPrice}>
            Total Price : <strong>{formatCurrency(totalPrice)}</strong>
          </div>
        </>
      )}
    </main>
  )
}

export default CartPage
