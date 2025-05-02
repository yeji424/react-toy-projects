import React, { useEffect, useState } from 'react'
import css from './PostDetailPage.module.css'
import { useParams } from 'react-router-dom'
import { getPostDetail } from '../apis/postApi'
import DOMPurify from 'DOMPurify'
import { formatDate } from '../utils/features'
const PostDetailPage = () => {
  const { postId } = useParams()
  const [post, setPost] = useState({})

  const cleanHtml = DOMPurify.sanitize(post?.content)
  console.log('cleanHtml', cleanHtml)
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await getPostDetail(postId)
        console.log('res', res)
        setPost(res)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPostDetail()
  }, [postId])
  return (
    <main className={css.postdetailpage}>
      <h2>상세페이지</h2>
      <section className={css.postSection}>
        <div className={css.img}>
          <img src={`${import.meta.env.VITE_BACK_URL}/${post.cover}`} alt={post.title} />
        </div>
        <div className={css.info}>
          <p>{post.author}</p>
          <p>{formatDate(post.createdAt)}</p>
        </div>
        <div className={css.summary}>{post.summary}</div>
        <div className={css.content} dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
      </section>
      <div className={css.btns}>
        <button>수정</button>
        <button>삭제</button>
        <button>목록</button>
      </div>
      <section className={css.comment}>댓글목록</section>
    </main>
  )
}

export default PostDetailPage
