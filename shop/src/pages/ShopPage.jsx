import React, { useState } from 'react'
import style from './ShopPage.module.css'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import Pagination from '@/components/Pagination'

const ShopPage = () => {
  const initProductsData = useLoaderData()
  console.log('ShopPage.js: initProductsData', initProductsData)

  const data = initProductsData.products.data
  const first = initProductsData.products.first
  const per_page = initProductsData.per_page

  console.log('ShopPage.js: data', data)
  console.log('ShopPage.js: first', first)
  console.log('ShopPage.js: per_page', per_page)

  const [isDown, setIsDown] = useState(false)

  const navigate = useNavigate()

  const [serchParams] = useSearchParams()
  // console.log('ShopPage:info-------', serchParams)

  const currentCategory = serchParams.get('category')

  const handleCategoryFilter = category => {
    const params = new URLSearchParams(serchParams) // 현재 파라미터 정보 유지
    // console.log('ShopPage:info-------', params)
    params.set('_page', 1) // 페이지 1로 초기화
    params.set('_per_page', per_page) // 페이지 당 상품 수 설정
    category ? params.set('category', category) : params.delete('category')
    // /shop/?_page=1&_per_page=12&category=${category
    console.log('params -----', params)
    navigate(`/shop/?${params}`)
  }

  const handleSort = sortOption => {
    const params = new URLSearchParams(serchParams) // 현재 파라미터 정보 유지

    params.set('_page', 1) // 페이지 1로 초기화
    params.set('_sort', sortOption) // 정렬 옵션
    setIsDown(false) // select바 닫기
    navigate(`/shop/?${params}`)
  }

  const currentSort = serchParams.get('_sort')
  const sortTextMap = {
    id: '업데이트순',
    price: '낮은 가격순',
    '-price': '높은 가격순',
    discount: '낮은 할인순',
    '-discount': '높은 할인순',
  }

  const getSortText = () => {
    return sortTextMap[currentSort] || '업데이트 순'
  }
  return (
    <main className={style.shopPage}>
      <h2>Shop All</h2>
      <div className={style.searchFn}>
        <div className={style.category}>
          <button
            onClick={() => {
              handleCategoryFilter('')
            }}
            className={currentCategory === null ? style.active : ''}
          >
            Al Items
          </button>
          <button
            onClick={() => {
              handleCategoryFilter('new')
            }}
            className={currentCategory === 'new' ? style.active : ''}
          >
            New Updates
          </button>
          <button
            onClick={() => {
              handleCategoryFilter('top')
            }}
            className={currentCategory === 'top' ? style.active : ''}
          >
            Top Items
          </button>
        </div>
        <div className={`${style.sort} ${isDown ? style.active : ''}`}>
          <div className={style.sortHeader} onClick={() => setIsDown(!isDown)}>
            <p>{getSortText()}</p>
            <i className={`bi bi-chevron-${isDown ? 'up' : 'down'}`}></i>
          </div>
          <ul>
            <li
              onClick={() => {
                handleSort('id')
              }}
              className={currentSort === 'id' ? style.active : ''}
            >
              업데이트순
            </li>
            <li
              onClick={() => {
                handleSort('price')
              }}
              className={currentSort === 'price' ? style.active : ''}
            >
              낮은 가격순
            </li>
            <li
              onClick={() => {
                handleSort('-price')
              }}
              className={currentSort === '-price' ? style.active : ''}
            >
              높은 가격순
            </li>
            <li
              onClick={() => {
                handleSort('discount')
              }}
              className={currentSort === 'discount' ? style.active : ''}
            >
              낮은 할인순
            </li>
            <li
              onClick={() => {
                handleSort('-discount')
              }}
              className={currentSort === '-discount' ? style.active : ''}
            >
              높은 할인순
            </li>
          </ul>
        </div>
      </div>
      <div className={style.productList}>
        <ul className={style.list}>
          {data.map(product => (
            <ProductCard key={product.id} data={product} />
          ))}
        </ul>
        <Pagination initProductsData={initProductsData} />
      </div>
    </main>
  )
}

export default ShopPage
