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
