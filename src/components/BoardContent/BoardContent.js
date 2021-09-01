import Column from 'components/Column/Column'
import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import { initialData } from '../../actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'


export default function BoardContent() {

  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const boardFromDb = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDb) {
      setBoard(boardFromDb)
      setColumns(mapOrder(boardFromDb.colums, boardFromDb.columnOrder, 'id'))
    }
  }, [])

  if (isEmpty(board)) {
    return <div className="not-found" style={{ padding: '10px', color: 'white' }}>Board not found</div>
  }

  const onColumnDrop = (dropResult) => {
    console.log(dropResult)
  }

  return (
    <div className="board-contents">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{ //background when move board
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
        getChildPayload={index => columns[index]}
      >
        {
          columns.map((column, index) => (
            <Draggable key={index}>
              <Column column={column} />
            </Draggable>
          ))
        }
      </Container>
    </div>
  )
}
