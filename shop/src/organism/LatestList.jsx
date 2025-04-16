import React from 'react'
import { Link } from 'react-router-dom'
import style from './LatestList.module.css'
import ProductCard from '../components/ProductCard'
const LatestList = () => {
  return (
    <section className={style.listCon}>
      <h2>The Latest</h2>
      <Link to={'shop'} className={style.more}>
        View All
      </Link>
      <ul className={style.list}>
        <ProductCard />
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
      </ul>
    </section>
  )
}

export default LatestList
