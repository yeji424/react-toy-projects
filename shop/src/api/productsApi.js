import axios from 'axios'

// const BASE_URL = 'http://localhost:3000/products/'

// 기본 API 호출 함수
const apiRequest = async (endpoint, params = {}, errorMessage = '요청 중 오류가 발생했습니다') => {
  try {
    const res = await axios.get(`/api/products${endpoint}`, { params })
    return res.data
  } catch (e) {
    console.error(errorMessage, e)
    throw e // 오류 던져서 호출자가 처리할 수 있게 함
  }
}
// 전체 상품 데이터 가져오기
export const getProductsData = async (query = '') => {
  // query string을 객체로 파싱해서 전달
  const queryParams = Object.fromEntries(new URLSearchParams(query))
  return await apiRequest('/', queryParams, '상품 목록을 불러오는 중 오류 발생')
}

// ID로 상품 하나 가져오기
export const getProductById = async id => {
  return await apiRequest(`/${id}`, {}, '상품 정보를 불러오는 중 오류 발생')
}

// 카테고리별 상품 가져오기
export const getProductsByCategory = async (category, limit = 10) => {
  try {
    return await apiRequest(
      '/',
      { category, _limit: limit },
      '카테고리별 상품을 불러오는 중 오류 발생'
    )
  } catch (e) {
    return [] // 에러 발생 시 빈 배열 반환
  }
}
