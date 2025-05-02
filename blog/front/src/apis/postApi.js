import axios from 'axios'
axios.defaults.withCredentials = true // 모든 요청에 대해 withCredentials 설정
const API_URL = import.meta.env.VITE_BACK_URL

// 게시물 등록
export const createPost = async postData => {
  const response = await axios.post(`${API_URL}/postWrite`, postData)
  return response.data
}

// 전체 게시물 조회
export const getPostList = async () => {
  const response = await axios.get(`${API_URL}/postList`)
  return response.data
}

// 게시물 디테일 조회
export const getPostDetail = async postId => {
  const response = await axios.get(`${API_URL}/postDetail/${postId}`)
  return response.data
}
