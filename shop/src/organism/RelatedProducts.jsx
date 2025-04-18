import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import style from './RelatedProducts.module.css'
import ProductCard from '@/components/ProductCard'
const RelatedProducts = ({ relatedProducts }) => {
  // console.log('SimilarProducts ---', relatedProducts)

  return (
    <div className={style.con}>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1100: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className={style.relatedSlider}
      >
        {relatedProducts.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RelatedProducts
