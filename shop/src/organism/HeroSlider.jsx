import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { getBannerData } from '../api/bannerApi'
import style from './HeroSlider.module.css'

const HeroSlider = () => {
  const [banner, setBanner] = useState([])
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBannerData()
        console.log('data----', data)
        setBanner(data)
      } catch (e) {
        console.log('err----', e)
      }
    }
    fetchBanner()
  }, [])
  return (
    <section>
      <h2 hidden>Banner Event</h2>
      <Swiper pagination={{ clickable: true }} modules={[Pagination]} className={style.mainSlider}>
        {banner.map(item => (
          <SwiperSlide key={item.id}>
            <div className={style.imgWrap}>
              <img src={item.img} alt={item.title} />
            </div>
            <div className={style.textWrap}>
              <p className={style.title}>{item.title}</p>
              <p className={style.price}>{item.desc}</p>
              <Link to={item.link} className={style.more}>
                View Product
              </Link>
            </div>
            {/* 아티클 요소 사용하면 됨 */}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HeroSlider
