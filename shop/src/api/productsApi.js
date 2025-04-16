import axios from 'axios'

const BASE_URL = 'http://localhost:3000/products/'

// 여러 상품 가져오기 (query로 필터링)
export const getProductsData = async (query = '') => {
  try {
    const res = await axios.get(`${BASE_URL}?${query}`)
    return res.data
  } catch (e) {
    console.log('err----', e)
    throw e
  }
}

// 단일 상품 id 가져오기
export const getProductById = async id => {
  try {
    const res = await axios.get(`${BASE_URL}${id}`)
    return res.data
  } catch (e) {
    console.log('err----', e)
    throw e
  }
}
