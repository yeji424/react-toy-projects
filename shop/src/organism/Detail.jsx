import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../api/productsApi'
import style from './Detail.module.css'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const Detail = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  const increase = () => {
    setQuantity(quantity + 1)
  }
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }
  const handleAddToCart = () => {
    console.log(`AddToCart ---- ${quantity}`)
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(productId)
        await delay(1000)
        setProduct(data)
        setLoading(false)
        console.log('data----', data)
      } catch (e) {
        console.log('err----', e)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  return (
    <>
      <section>
        <h2 hidden>Banner Event</h2>
        {loading || !product ? (
          <div className={style.detailCon}>
            <div className={style.detailItem}>
              <div className={`${style.imgSkeleton} ${style.imgWrap}`}></div>
            </div>
            <div className={style.detailItem}>
              <div className={`${style.textSkeleton} ${style.info}`}></div>
            </div>
          </div>
        ) : (
          <div className={style.detailCon}>
            <div className={style.detailItem}>
              <div className={style.imgWrap}>
                <img src={`/public/img/${product.img}`} alt={product.title} />
              </div>
            </div>
            <div className={style.detailItem}>
              <div className={style.info}>
                <h2>{product.title}</h2>
                <span className={style.price}></span>
                <div className={style.rating}>
                  ★★★★★ <span>1 customer review</span>
                </div>
                <p className={style.desc}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae magni quasi
                  doloremque sapiente cupiditate molestiae optio eaque ducimus id impedit? Aliquid
                  cumque quidem doloribus laudantium nostrum commodi architecto distinctio iusto.
                </p>
                <div className={style.orderBox}>
                  <div className={style.quantityControl}>
                    <button onClick={decrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increase}>+</button>
                  </div>
                  <button className={style.addToCart} onClick={handleAddToCart}>
                    ADD TO CART
                  </button>
                </div>
                <div className={style.icons}>
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-regular fa-envelope"></i>
                  <span>|</span>
                  <div className={style.social}>
                    <i className="fab fa-facebook" />
                    <i className="fab fa-instagram" />
                    <i className="fab fa-twitter" />
                  </div>
                </div>
                <div className={style.meta}>
                  <p>
                    <strong>SKU:</strong> 12
                  </p>
                  <p>
                    <strong>Categories:</strong> Fashion, style
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Detail
