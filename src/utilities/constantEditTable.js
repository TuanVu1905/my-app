
//press enter to save
export const saveColumnTitleByEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}

//select all content when click title
export const selectAllInlineText = (e) => {
  e.target.focus()
  e.target.select()
}