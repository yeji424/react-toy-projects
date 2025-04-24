import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import BoardSearch from './BoardSearch'
import { fetchBoard } from '@/store/boardSlice'

const BoardList = () => {
  const dispatch = useDispatch()
  const { board } = useSelector(state => state.board)
  console.log(board)

  useEffect(() => {
    dispatch(fetchBoard())
  }, [dispatch])

  return board.length === 0 ? (
    <div>none</div>
  ) : (
    <ListGroup>
      {board.map(boardList => (
        <ListGroup.Item
          key={boardList.id}
          className=" d-flex justify-content-between align-items-center"
        >
          <p className=" flex-grow-1">{boardList.boardDesc}</p>
          <p className=" m-2" style={{ fontSize: '0.75em' }}>
            {boardList.createAt}
          </p>
          <i className="bi bi-trash"></i>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default BoardList
