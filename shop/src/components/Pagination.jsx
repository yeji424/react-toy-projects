import React from 'react'
import style from './Pagination.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
const Pagination = ({ initProductsData }) => {
  console.log('Pagenation:initProductsData : ', initProductsData.products.last)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { first, last, prev, next, pages, items } = initProductsData.products

  const currentPage = Number(searchParams.get('_page') || '1')

  const handlePageChange = page => {
    const params = new URLSearchParams(searchParams)
    params.set('_page', page)
    navigate(`/shop/?${params}`)
  }

  const getPageNumbers = () => {
    const maxPageNumbers = 10 // 한번에 보여줄 최대 페이지 번호 수
    // 전체 페이지가 최대 페이지보다 적으면 모든 페이지 번호 표시
    if (pages <= maxPageNumbers) {
      return Array.from({ length: maxPageNumbers }, (_, i) => i + 1)
    }

    // 페이지가 많을 경우 현재 페이지 번호를 기준으로 주변 번호 생성
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2))
    let endPage = Math.min(pages, startPage + maxPageNumbers - 1)

    if (endPage > pages) {
      endPage = pages
      startPage = Math.max(1, endPage - maxPageNumbers + 1)
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const pageNumbers = getPageNumbers()
  console.log('pageNumbers : ', pageNumbers)

  return (
    <div className={style.paginationArea}>
      <button
        onClick={() => {
          handlePageChange(first)
        }}
        disabled={currentPage === first}
        className={currentPage === first ? style.disabled : ''}
      >
        태초마을
      </button>
      <button
        onClick={() => {
          handlePageChange(prev)
        }}
        disabled={prev === null || currentPage === first}
        className={currentPage === first ? style.disabled : ''}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      {pageNumbers.map(num => (
        <button
          key={num}
          onClick={() => {
            handlePageChange(num)
          }}
          className={num === currentPage ? `${style.active}` : ''}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => {
          handlePageChange(next)
        }}
        disabled={next === null || currentPage === last}
        className={currentPage === last ? style.disabled : ''}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
      <button
        onClick={() => {
          handlePageChange(last)
        }}
      >
        마지막 페이지 이동
      </button>
    </div>
  )
}

export default Pagination
