import axios from 'axios'

export const getBoardData = async () => {
  try {
    const res = await axios.get(`/api/board`)
    return res.data
  } catch (e) {
    console.log('ERROR | ', e)
    throw e
  }
}
