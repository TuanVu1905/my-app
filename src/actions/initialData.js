export const initialData = {
    boards : [
        {
            id:'board-1',
            columnOrder : ['column-1', 'column-2', 'column-3'],
            colums: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title:'To do column',
                    cardOrder: ['card-3','card-2','card-1', 'card-4'],
                    cards:[
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title:'Title card 1',
                            cover: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.15752-9/240830266_898602150866058_4455031836922052019_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=ae9488&_nc_ohc=b7B8Yyl_AxgAX8r288H&_nc_ht=scontent.fsgn2-3.fna&oh=471ef699bab145a209cbfea7b89388b4&oe=61505631',
                        },
                        {
                            id: 'card-2',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title:'Title card 2',
                            cover: null,
                        },
                        {
                            id: 'card-3',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title:'Title card 3',
                            cover: null,
                        },
                        {
                            id: 'card-4',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title:'Title card 4',
                            cover: null,
                        }
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title:'Inprogress column',
                    cardOrder: ['card-6','card-7','card-8'],
                    cards:[
                        {
                            id: 'card-6',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title:'Title card 6',
                            cover: null,
                        },
                        {
                            id: 'card-7',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title:'Title card 7',
                            cover: null,
                        },
                        {
                            id: 'card-8',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title:'Title card 8',
                            cover: null,
                        },
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title:'Done Task',
                    cardOrder: ['card-9','card-10','card-11'],
                    cards:[
                        {
                            id: 'card-9',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title:'Title card 9',
                            cover: null,
                        },
                        {
                            id: 'card-10',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title:'Title card 10',
                            cover: null,
                        },
                        {
                            id: 'card-11',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title:'Title card 11',
                            cover: null,
                        },
                    ]
                }
            ]
        }
    ],
}