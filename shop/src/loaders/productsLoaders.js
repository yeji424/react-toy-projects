import { getProductById, getProductsByCategory } from '../api/productsApi'

// 지연 확인용 함수
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const detailPageLoader = async ({ params }) => {
  try {
    await delay(1000)
    const product = await getProductById(params.productId)
    console.log('productsLoaders.js:product', product.category)

    if (!product) {
      throw new Response('상품이 존재하지 않습니다.', {
        status: 404,
      })
    }

    // 상품 ID의 카테고리 정보와 일치하는 상품들
    const relatedProducts = await getProductsByCategory(product.category, 10)
    // 배열에서 product.id와 일치하는 상품을 제외
    const filteredRelatedProducts = relatedProducts.filter(
      relatedProduct => relatedProduct.id !== product.id
    )
    return { product, filteredRelatedProducts }
  } catch (e) {
    console.error(e)
    throw new Response('상 데이터 불러오던 중 오류 발생', { status: e.status || 500 })
  }
}
