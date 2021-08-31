import Column from 'components/Column/Column'
import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import {initialData} from '../../actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utilities/sorts' 

export default function BoardContent() {

    const [board, setBoard] = useState({});
    const [columns,setColumns] = useState([])

    useEffect(() => {
       const boardFromDb = initialData.boards.find(board => board.id === 'board-1')
       if(boardFromDb) {
           setBoard(boardFromDb);

           //sort nâng cao
            

           setColumns(mapOrder(boardFromDb.colums, boardFromDb.columnOrder,'id'))
       }
    },[])

    if(isEmpty(board)) {
        return <div className="not-found" style={{padding:'10px', color:'white'}}>Board not found</div>
    }

    return (
        <div className="board-contents">
            {
                columns.map((column, index) => <Column key={index} column={column} />)
            }
            
        </div>
    )
}
