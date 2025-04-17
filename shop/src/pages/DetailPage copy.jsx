import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
const DetailPage = () => {
  const test = useParams()
  console.log('productId', test)

  const { productId } = useParams()
  console.log('productId', productId)

  const product = useLoaderData()
  console.log('p--', product.img)

  return (
    <div>
      <h2>DetailPage</h2>
    </div>
  )
}

export default DetailPage
