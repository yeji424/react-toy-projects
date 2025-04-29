import { useQuery } from '@tanstack/react-query'
import { getCampingData } from './getCampingApi'

export const useCamping = (page, perPage) => {
  return useQuery({
    queryKey: ['camping', page], // 페이지 변경될 때마다 새로 만드는 것
    queryFn: () => getCampingData(page, perPage),
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 10,
  })
}
