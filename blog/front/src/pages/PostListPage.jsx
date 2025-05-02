import React, { useEffect, useState } from 'react'
import css from './PostListPage.module.css'
import { PostCard } from '../components/PostCard'
import { getPostList } from '../apis/postApi'
const PostListPage = () => {
  const [postList, setPostList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getPostList()
        console.log(data)
        setPostList(data)
        setLoading(false)
      } catch (e) {
        console.log(e)
        setError('데이터를 가져오는 중 오류 발생')
      }
    }
    fetchPostList()
  }, [])

  return (
    <main className={css.postlistpage}>
      <h2>PostListPage</h2>

      {error && <p className={css.error}>{error}</p>}
      {loading && <p>로딩중 ...</p>}
      {!loading && postList.length === 0 && <p>게시물이 없습니다.</p>}
      {!loading && postList.length > 0 && (
        <ul className={css.postlist}>
          {postList.map(post => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default PostListPage
