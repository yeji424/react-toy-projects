import { getProductById, getProductsByCategory, getProductsData } from '../api/productsApi'

// 지연 확인용 함수
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const detailPageLoader = async ({ params }) => {
  try {
    await delay(1000)
    const product = await getProductById(params.productId)
    // console.log('productsLoaders.js:product', product.category)

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
    return {
      product,
      relatedProducts: filteredRelatedProducts,
    }
  } catch (e) {
    console.error(e)
    throw new Response('데이터 불러오던 중 오류 발생', { status: e.status || 500 })
  }
}

export const shopPageLoader = async ({ request }) => {
  // console.log('productsLoaders ----', request.url)

  const url = new URL(request.url)
  //_page=2&_per_page=2
  const page = url.searchParams.get('_page') || 1
  const per_page = url.searchParams.get('_per_page') || 6
  const category = url.searchParams.get('category') || ''
  const sort = url.searchParams.get('_sort') || ''

  let queryString = `?_page=${page}&_per_page=${per_page}`
  category ? (queryString += `&category=${category}`) : queryString

  sort ? (queryString += `&_sort=${sort}`) : queryString
  try {
    const products = await getProductsData(queryString)
    return { products, per_page }
  } catch (e) {
    console.error('ERROR | ', e)
  }
}
