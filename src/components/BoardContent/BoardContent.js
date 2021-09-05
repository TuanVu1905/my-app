import Column from 'components/Column/Column'
import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import { initialData } from '../../actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { Container, Draggable } from 'react-smooth-dnd'
import { Button, Col, Container as ContainerBootstrap, Form, Row } from 'react-bootstrap'
import { useRef } from 'react'


export default function BoardContent() {

  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumns, setOpenNewColumns] = useState(false)
  const inputRef = useRef(null)
  const [newColumnTitles, setNewColumnTitles] = useState('')

  const onNewColumnTile = (e) => setNewColumnTitles(e.target.value)

  useEffect(() => {
    const boardFromDb = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDb) {
      setBoard(boardFromDb)
      setColumns(mapOrder(boardFromDb.colums, boardFromDb.columnOrder, 'id'))
    }
  }, [])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [openNewColumns]) //hàm chỉ chạy khi biến openNewColumns thay đổi

  if (isEmpty(board)) {
    return <div className="not-found" style={{ padding: '10px', color: 'white' }}>Board not found</div>
  }

  const toggleOpenNewColumn = () => {
    setOpenNewColumns(!openNewColumns)
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


  const addNewColumn = () => {
    if (!newColumnTitles) {
      inputRef.current.focus()
    }
    const newColumnAdd = {
      id: Math.random().toString(36).substr(2, 5), //random characters
      boardId: board.id,
      title: newColumnTitles.trim(),
      cardOrder: [],
      cards: []
    }
    let newColumns = [...columns]
    newColumns.push(newColumnAdd)

    //update board
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(x => x.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)

    setNewColumnTitles('')
    toggleOpenNewColumn()
  }

  const onUpdateColumn = (newColumnUpdate) => {

    const columnId = newColumnUpdate.id

    let newColumns = [...columns]

    const columnIndexToUpdate = newColumns.findIndex(item => item.id === columnId)

    //check xóa hay sửa
    if (newColumnUpdate._destroy) {
      //xóa
      newColumns.splice(columnIndexToUpdate, 1)
    }
    else {
      //edit
      newColumns.splice(columnIndexToUpdate, 1, newColumnUpdate)
    }
    //update board
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(x => x.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    // console.log(columns)
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
              <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn}/>
            </Draggable>
          ))
        }
      </Container>
      <ContainerBootstrap className="trello-container-bootstrap">
        {!openNewColumns &&
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumn}>
              <i className="fa fa-plus icon" /> Add another column
            </Col>
          </Row>
        }
        {openNewColumns &&
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                ref={inputRef}
                type="text"
                size="small"
                placeholder="Add new column"
                className="input-new-column shadow-none"
                value={newColumnTitles}
                onChange={onNewColumnTile}
                onKeyDown={
                  event => (event.key === 'Enter') && addNewColumn()
                }
              />
              <Button onClick={addNewColumn} variant='success' size='sm' className="shadow-none btn">Add column</Button>
              <span className="cancel-new-column cancel-icon">
                <i onClick={toggleOpenNewColumn} className="fa fa-trash" />
              </span>
            </Col>
          </Row>
        }
      </ContainerBootstrap>
    </div>
  )
}
