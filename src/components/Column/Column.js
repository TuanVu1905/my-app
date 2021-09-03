import Card from 'components/Card/Card'
import React from 'react'
import './Column.scss'
import { mapOrder } from 'utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'


export default function Column(props) {

  const { column, onCardDrop } = props

  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  return (
    <div className="column">
      <header className="header column-drag-handle">{column.title}</header>
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
          <i className="fa fa-plus icon"/> Add another card
        </div>
      </footer>
    </div>
  )
}
