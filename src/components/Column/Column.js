import Card from 'components/Card/Card'
import React from 'react'
import './Column.scss'
import { mapOrder } from 'utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'


export default function Column(props) {

  const { column } = props

  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const onCardDrop = (dropResult) => {
    console.log(dropResult)
  }
  return (
    <div className="column">
      <header className="header column-drag-handle">{column.title}</header>
      <div className="card-list">
        <Container
          {...column.props}
          groupName="col" //cho phép kéo thả chuyển item qua lại
          // onDragStart={e => console.log('drag started', e)}
          // onDragEnd={e => console.log('drag end', e)}
          // onDragEnter={() => {
          //   console.log('drag enter:', column.id)
          // }}
          // onDragLeave={() => {
          //   console.log('drag leave:', column.id)
          // }}
          // onDropReady={p => console.log('Drop ready: ', p)}
          onDrop={onCardDrop}
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
      <footer>Add another card</footer>
    </div>
  )
}
