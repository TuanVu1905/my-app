import Task from 'components/Task/Task'
import React from 'react'
import './Column.scss'

export default function Column() {
    return (
        <div className="column">
                <header>BrainStorm</header>
                <ul className="task-list">
                     <Task />
                    <li className="task-item">lorem ipsum dolor sit amet, consectetur adip</li>
                    <li className="task-item">lorem ipsum dolor sit amet, consectetur adip</li>
                    <li className="task-item">lorem ipsum dolor sit amet, consectetur adip</li>
                    <li className="task-item">lorem ipsum dolor sit amet, consectetur adip</li>
                    <li className="task-item">lorem ipsum dolor sit amet, consectetur adip</li>
                    <li className="task-item">lorem ipsum dolor sit amet, consectetur adip</li>
                </ul>
                <footer>Add another card</footer>
            </div>
    )
}
