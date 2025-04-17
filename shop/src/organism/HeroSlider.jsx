import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { getBannerData } from '../api/bannerApi'
import style from './HeroSlider.module.css'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const HeroSlider = () => {
  const [banner, setBanner] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 배너 데이터를 가져오기 전에 미리 첫 번째 이미지 프리로드
    const preloadFirstImage = () => {
      const img = new Image()
      img.src = '/public/vite.svg' // 첫 번째 이미지 경로를 알고 있다면 직접 지정
    }

    preloadFirstImage()

    const fetchBanner = async () => {
      try {
        setLoading(true)
        const data = await getBannerData()

        await delay(1000) // 2초 지연

        setBanner(data)
        setLoading(false)
      } catch (e) {
        console.log('err----', e)
        setLoading(false)
      }
    }
    fetchBanner()
  }, [])

  return (
    <section>
      <h2 hidden>Banner Event</h2>
      <Swiper pagination={{ clickable: true }} modules={[Pagination]} className={style.mainSlider}>
        {loading ? (
          <SwiperSlide>
            <div className={`${style.skeleton} ${style.imgWrap}`}></div>
          </SwiperSlide>
        ) : (
          banner.map(item => (
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
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  )
}

export default HeroSlider
