// import React, { useEffect, useState } from 'react'
import css from './WeatherPage.module.css'
import { useWeather } from './useWeatherApi'
import { useSearchParams } from 'react-router-dom'
import { Button } from './Button'

const WeatherPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const city = searchParams.get('city')
  // const [weatherData, setWeatherData] = useState(null)

  const cityButtons = [
    { id: 'current', label: '현재위치' },
    { id: 'seoul', label: '서울' },
    { id: 'taiwan', label: '타이완' },
    { id: 'paris', label: '파리' },
  ]

  const { data: weatherData, isLoading, isError } = useWeather(city)

  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     try {
  //       let data
  //       if (city) {
  //         data = await getCountryData(city)
  //       } else {
  //         data = await getCurrentData()
  //       }
  //       console.log('Weather Data : ', data)
  //       setWeatherData(data)
  //     } catch (e) {
  //       console.error('ERROR | ', e)
  //     }
  //   }
  //   fetchWeatherData()
  // }, [city])

  const handleChangeCity = city => {
    if (city === 'current') {
      setSearchParams({})
    } else {
      setSearchParams({ city })
    }
  }

  isLoading && <p>Loading...</p>
  isError && <p>ERROR...</p>
  return (
    <main>
      <h2>오늘의 날씨 정보</h2>
      <div className={css.weatherInfo}>
        <p className={css.location}>
          {weatherData?.sys.country} / {weatherData?.name}
        </p>
        <div className={css.temperature}>
          <p>{weatherData?.main.temp} &#8451;</p>
          <p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`}
              alt=""
            />
          </p>
        </div>
      </div>
      <div className={css.btnList}>
        {cityButtons.map(button => (
          <Button
            key={button.id}
            city={button.id}
            label={button.label}
            onClick={handleChangeCity}
          />
        ))}
      </div>
    </main>
  )
}

export default WeatherPage
