import Card from 'components/Card/Card'
import React, { useEffect, useState, useCallback } from 'react'
import './Column.scss'
import { mapOrder } from 'utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'
import Modals from 'components/Common/Modals'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { saveColumnTitleByEnter, selectAllInlineText } from 'utilities/constantEditTable'


export default function Column(props) {

  const { column, onCardDrop, onUpdateColumn } = props

  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const [columnTitle, setColumnTitle] = useState('')

  const handleChangeTitle = useCallback((e) => {
    setColumnTitle(e.target.value)
  }, [])

  useEffect( () => {
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
            onClick={selectAllInlineText}
            onChange={handleChangeTitle}
            onBlur={handleChangeTitleBlur}
            onKeyDown={saveColumnTitleByEnter}
            onMouseDown={e => e.preventDefault()}
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
      </div>
      <footer>
        <div className='footer-actions'>
          <i className="fa fa-plus icon" /> Add another card
        </div>
      </footer>
      <Modals
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove Column"
        content={`Are you sure removing colum <strong>${column.title}</strong>`} />
    </div>
  )
}
