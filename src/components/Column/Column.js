import Card from 'components/Card/Card'
import React from 'react'
import './Column.scss'
import { mapOrder } from 'utilities/sorts'


export default function Column(props) {

    const {column} = props;
    const card = mapOrder(column.cards, column.cardOrder, 'id');
    console.log(column)
    return (
        <div className="column">
                <header className="header">{column.title}</header>
                <ul className="card-list">
                    {
                        card.map((card, index) => <Card key={index} card={card} />)
                    }
                </ul>
                <footer>Add another card</footer>
            </div>
    )
}
