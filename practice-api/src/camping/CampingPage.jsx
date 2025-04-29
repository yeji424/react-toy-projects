import React, { useState } from 'react'
import { useCamping } from './useCamping'
import css from './CampingPage.module.css'
import DetailModal from './DetailModal'

const CampingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const [page, setPage] = useState(1)
  const perPage = 5

  const { data, isError, isLoading } = useCamping(page, perPage)
  const campingData = data?.data
  const totalCnt = data?.totalCount
  const totalPages = Math.ceil(totalCnt / perPage)

  console.log('캠핑 데이터 : ', data)
  console.log('캠핑 데이터---- : ', campingData)
  console.log('totalCnt : ', totalCnt)

  const HandleCampingClick = list => {
    setIsModalOpen(true)
    setSelected(list)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1)
  }
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  const getPageNumbers = (currentPage, totalPages) => {
    const maxVisible = 7
    const half = Math.floor(maxVisible / 2)
    let start = Math.max(1, currentPage - half)
    let end = start + maxVisible - 1

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - maxVisible + 1)
    }

    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  isError && <p>Error...</p>
  isLoading && <p>Loading...</p>
  return (
    <main>
      <h2>야영장 정보</h2>
      <div>
        <p className={css.pageInfo}>
          총 {totalCnt}개 중 {perPage}개 표시 | {page} 페이지
        </p>
        <ul className={css.list}>
          {campingData?.map((list, i) => (
            <li key={list['야영장명'] + i} onClick={() => HandleCampingClick(list)}>
              <p>{list['야영장명']}</p>
              <p>주소 : {list['주소']}</p>
              <p>
                연락처 : {list['연락처 앞자리']}-{list['연락처 중간자리']}-{list['연락처 끝자리']}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className={css.pagination}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          &lt;
        </button>

        {getPageNumbers(page, totalPages).map(p => (
          <button key={p} onClick={() => setPage(p)} className={page === p ? css.active : ''}>
            {p}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={page === totalPages}>
          &gt;
        </button>
      </div>

      {isModalOpen && <DetailModal selected={selected} onClose={() => setIsModalOpen(false)} />}
    </main>
  )
}

export default CampingPage
