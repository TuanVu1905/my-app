import Column from 'components/Column/Column'
import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import { initialData } from '../../actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
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

    //update columns
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    //update board
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(x => x.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    //tránh column ko liên quan mà vẫn render
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

      let newColumns = [...columns]
      let currentColumn = newColumns.find(x => x.id === columnId) // object

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(x => x.id)

      setColumns(newColumns)
    }
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
              <Column column={column} onCardDrop={onCardDrop} />
            </Draggable>
          ))
        }
      </Container>
      <div className="add-new-column">
        <i className="fa fa-plus icon" /> Add another column
      </div>
    </div>
  )
}
