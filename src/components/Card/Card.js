import React from 'react'
import './Card.scss'

export default function Card(props) {
  const { cards } = props

  return (

    <div className="card-item">
      {
        cards.cover &&
        <img
          src={cards.cover}
          alt='emyeu'
          onMouseDown={e => e.preventDefault()}/>
      }
      {
        cards.title
      }
    </div >
  )
}
