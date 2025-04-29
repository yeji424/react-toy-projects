import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// 좌표로 날씨정보 가져오기
export const getWeatherByLocation = async (lat, lon) => {
  try {
    const res = await axios.get(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang-kr&units=metric`
    )
    return res.data
  } catch (e) {
    console.error('ERROR | ', e)
  }
}
// 현재 위치(위도, 경도)의 날씨 정보 가져오기
export const getCurrentData = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords
          const res = await getWeatherByLocation(latitude, longitude)
          resolve(res)
        } catch (e) {
          console.log('ERROR | ', e)
          reject(e)
        }
      },
      e => {
        console.log('ERROR | ', e)
        reject(e)
      }
    )
  })
}

// 도시 정보 가져오기
export const getCountryData = async city => {
  try {
    const res = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&lang-kr&units=metric`)
    return res.data
  } catch (e) {
    console.error('ERROR | ', e)
  }
}

// 리엑트 쿼리에서 데이터 가져오기
export const useWeather = city => {
  console.log('날씨 데이터 : ', city)
  return useQuery({
    queryKey: ['weather', city], // 데이터 고유 아이디를 반영해 줌 (필수)
    //  기본 함수, 조건 함수 기입 가능
    queryFn: async () => {
      try {
        const data = city ? await getCountryData(city) : await getCurrentData()
        return data
      } catch (e) {
        console.error('ERROR | ', e)
      }
    },
    staleTime: 1000 * 3, // 신선함 유지 시간 (retry를 하지 않아도 되는 변경이 자주 발생하지 않는 데이터)
    retry: 1, // 실패 시 한 번만 재시도한다
  })
}

// cashTime, inable
