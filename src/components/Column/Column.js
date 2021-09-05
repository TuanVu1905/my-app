import Card from 'components/Card/Card'
import React, { useEffect, useRef, useState } from 'react'
import './Column.scss'
import { mapOrder } from 'utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { Button, Dropdown, Form } from 'react-bootstrap'
import Modals from 'components/Common/Modals'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { saveColumnTitleByEnter, selectAllInlineText } from 'utilities/constantEditTable'
import { cloneDeep } from 'lodash'

export default function Column(props) {

  const { column, onCardDrop, onUpdateColumn } = props

  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const [columnTitle, setColumnTitle] = useState('')

  const [openNewCard, setOpenNewCard] = useState(false)

  const [newCardTitles, setNewCardTitles] = useState('')

  const onNewCardTile = (e) => setNewCardTitles(e.target.value)

  const inputRef = useRef(null)

  const toggleOpenNewCard = () => {
    setOpenNewCard(!openNewCard)
  }

  const handleChangeTitle = (e) => setColumnTitle(e.target.value)

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [openNewCard])

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title]) //khi nào title thay đổi thì chạy

  const toggleShowModal = () => setShowConfirmModal(!showConfirmModal)

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      //remove column
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowModal()
  }

  const handleChangeTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  const addNewCard = () => {
    if (!newCardTitles) {
      inputRef.current.focus()
    }
    else {
      const newCardAdd = {
        id: Math.random().toString(36).substr(2, 5), //random characters
        boardId: column.boardId,
        title: newCardTitles.trim(),
        columnId: column.id,
        cover: null
      }
      // console.log(newCardAdd)
      let newColumn = cloneDeep(column)
      newColumn.cards.push(newCardAdd)
      newColumn.cardOrder.push(newCardAdd.id)
      onUpdateColumn(newColumn)
      setNewCardTitles('')
      toggleOpenNewCard()
    }
  }

  return (
    <div className="column">
      <header className="header column-drag-handle">
        <div className="column-title">
          {/* {column.title} */}
          <Form.Control
            type="text"
            size="small"
            className="tuanvu-edit-table shadow-none"
            value={columnTitle}
            spellCheck="false"
            onClick={selectAllInlineText} // click value
            onChange={handleChangeTitle} // thay đổi title
            onBlur={handleChangeTitleBlur}// nhấn bên ngoài để thay đổi title
            onKeyDown={saveColumnTitleByEnter} // nhấn ecter để đổi tên title
            onMouseDown={e => e.preventDefault()} // lần chạm vào để di chuyển column ko thay đổi title
          />
        </div>
        <div className="column-dropdowns">
          <Dropdown>
            <Dropdown.Toggle className="dropdown-btn shadow-none" id="dropdown-basic" size="sm" />
            <Dropdown.Menu >
              <Dropdown.Item>Add Card ...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowModal}>Remove Column...</Dropdown.Item>
              <Dropdown.Item>Move all card in this columns (beta)</Dropdown.Item>
              <Dropdown.Item>Move all card ...</Dropdown.Item>
              <Dropdown.Item>Move all card ...</Dropdown.Item>
              <Dropdown.Item>Move all card ...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          {...column.props}
          groupName="col" //cho phép kéo thả chuyển item qua lại
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {
            cards.map((card, index) => (
              <Draggable key={index}>
                <Card cards={card} />
              </Draggable>
            ))
          }
        </Container>
        {
          openNewCard && <div className="add-new-card">
            <Form.Control
              ref={inputRef}
              as="textarea"
              rows="3"
              size="small"
              placeholder="Add new card"
              className="textarea-new-card shadow-none"
              value={newCardTitles}
              onChange={onNewCardTile}
              onKeyDown={
                event => (event.key === 'Enter') && addNewCard()
              }
            />
          </div>
        }
      </div>
      <footer>
        {
          openNewCard && <div className="add-new-card-button">
            <Button
              onClick={addNewCard}
              variant='success' size='sm' className="shadow-none btn">Add card</Button>
            <span className="cancel-icon">
              <i
                onClick={toggleOpenNewCard}
                className="fa fa-trash icon" />
            </span>
          </div>
        }
        {
          !openNewCard &&
          <div onClick={toggleOpenNewCard} className='footer-actions'>
            <i className="fa fa-plus icon" /> Add another card
          </div>
        }
      </footer>
      <Modals
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove Column"
        content={`Are you sure removing colum <strong>${column.title}</strong>`} />
    </div>
  )
}
