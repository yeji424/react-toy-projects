import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../api/productsApi'
const DetailPage = () => {
  // const test = useParams()
  // console.log('productId', test)

  const { productId } = useParams()
  // console.log('productId', productId)

  const [product, setProduct] = useState({})
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(productId)
        setProduct(res)
      } catch (e) {
        console.error(e)
      }
    }
    fetchProduct()
  }, [productId])

  return (
    <main>
      <h2>DetailPage</h2>
      <p>{product.title}</p>
    </main>
  )
}

export default DetailPage
