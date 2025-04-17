import { getProductById, getProductsByCategory } from '../api/productsApi'

export const detailPageLoader = async ({ params }) => {
  try {
    const product = await getProductById(params.productId)
    console.log('productsLoaders.js:product', product.category)

    if (!product) {
      throw new Response('상품이 존재하지 않습니다.', {
        status: 404,
      })
    }

    const relatedProducts = await getProductsByCategory(product.category, 10)
    return { product, relatedProducts }
  } catch (e) {
    console.error(e)
    throw new Response('상품 데이터 불러오던 중 오류 발생', { status: e.status || 500 })
  }
}
