import React, { useState } from 'react'
import css from './CreatePost.module.css'
import QuillEditor from '../components/QuillEditor'
import { createPost } from '../apis/postApi.js'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [files, setFiles] = useState('')
  const [content, setContent] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleContentChange = () => {
    setContent(content)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      // 기본 유효성 검사
      if (title || summary || content) {
        setError('모든 필드를 입력해주세요')
        return
      }
      // 업로드할 파일 정리
      const data = new FormData()
      data.set('title', title)
      data.set('summary', summary)
      data.set('content', content)

      // 첨부파일이 있는 경우에만 추가
      if (files[0]) {
        //파일 크기 및 형식 검사 (아직 안함)

        data.set('files', files[0])
      }

      try {
        setIsSubmitting(true)
        const postData = await createPost(data)
        console.log('등록 성공', postData)

        setIsSubmitting(false)
        navigate('/')
      } catch (e) {
        console.log('ERROR | ', e)
      }
    } catch (e) {
      console.log('ERROR | ', e)
      setError('', e.message)
    } finally {
      setIsSubmitting(false)
      setError('')
    }
  }
  return (
    <main className={css.createpost}>
      <h2>글쓰기</h2>
      <form className={css.writecon} onSubmit={handleSubmit}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="title">요약 내용</label>
        <input
          type="text"
          id="summary"
          name="summary"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <label htmlFor="file">파일</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          value={files}
          onChange={e => setFiles(e.target.value)}
        />
        <label htmlFor="content">내용</label>
        <div className={css.editorWrapper}>
          <QuillEditor
            value={content}
            onChange={handleContentChange}
            placeholder={'내용을 입력해주세요'}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '등록 중 ...' : '등록'}
        </button>
      </form>
    </main>
  )
}

export default CreatePost
