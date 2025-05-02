import axios from 'axios'
axios.defaults.withCredentials = true // 모든 요청에 대해 withCredentials 설정
const API_URL = import.meta.env.VITE_BACK_URL

export const createPost = async postData => {
  const res = await axios.post(`${API_URL}/postWrite`, postData)
  return res.data
}
