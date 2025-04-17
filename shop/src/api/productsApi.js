import axios from 'axios'

// const BASE_URL = 'http://localhost:3000/products/'

export const getProductsData = async (query = '') => {
  try {
    const res = await axios.get(`/api/products/?${query}`)
    return res.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const getProductById = async id => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    return res.data
  } catch (e) {
    console.error(e)
    throw e
  }
}
