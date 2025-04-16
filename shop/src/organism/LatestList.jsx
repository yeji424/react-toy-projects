import { useEffect, React, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './LatestList.module.css'
import ProductCard from '../components/ProductCard'
import { getProductsData } from '../api/productsApi'

const LatestList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsData(`category=new&_limit=6`)
        setProducts(data)
        console.log('data----', data)
      } catch (e) {
        console.log('err----', e)
      }
    }
    fetchProducts()
  }, [])
  return (
    <section className={style.listCon}>
      <h2>The Latest</h2>
      <Link to={'shop'} className={style.more}>
        View All
      </Link>
      <ul className={style.list}>
        {products.map(data => (
          <li key={data.id}>
            <ProductCard data={data} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LatestList
