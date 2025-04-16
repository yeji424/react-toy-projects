import React, { Suspense } from 'react'
import HeroSlider from '../organism/HeroSlider'
import LatestList from '../organism/LatestList'

// const HeroSlider = lazy(() => import('@/organism/HeroSlider'))

const MainPage = () => {
  return (
    <main>
      <h2 hidden>MainPage</h2>
      {/* <Suspense fallback={<div>Loading slider...</div>}> */}
      <HeroSlider />
      <LatestList />
      {/* </Suspense> */}
    </main>
  )
}

export default MainPage
