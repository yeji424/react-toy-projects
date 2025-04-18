import axios from 'axios'

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
// 모든 상품 또는 쿼리 기반 상품 가져오기
export const getProductsData = async (queryParams = {}) => {
  return apiRequest('', queryParams, '상품 목록을 가져오는 중 오류가 발생했습니다')
}

// ID로 특정 상품 가져오기
export const getProductById = async id => {
  return apiRequest(`/${id}`, {}, `ID: ${id}인 상품을 가져오는 중 오류가 발생했습니다`)
}

// 카테고리별 상품 조회
export const getProductsByCategory = async (category, limit = 10) => {
  return await apiRequest(
    '',
    {
      category,
      _limit: limit,
    },
    `카테고리: ${category} 상품을 가져오는 중 오류가 발생했습니다`
  )
}
