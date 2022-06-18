import React from "react"
import Alert from "./component/Alert"
import Item from "./component/Item"
import { nanoid } from "nanoid"

export default function App() {
  const [name, setName] = React.useState("")
  const [list, setList] = React.useState(
    JSON.parse(localStorage.getItem("list")) || []
  )
  const [isEdit, setIsEdit] = React.useState(false)
  const [editID, setEditID] = React.useState(null)

  function handleClick(e) {
    e.preventDefault()
    if (name === "") return
    if (name && isEdit) {
      recentUpdate()
    } else {
      const newItem = { id: nanoid(), title: name }
      setList((prevList) => {
        return [...prevList, newItem]
      })
      setName("")
    }
  }

  function recentUpdate() {
    let result = []
    list.map((item) => {
      return item.id === editID
        ? result.unshift({ ...item, title: name })
        : result.push(item)
    })

    setIsEdit(false)
    setEditID(null)
    setName("")

    return setList(result)
  }

  function editItem(id) {
    const selectedItem = list.find((item) => item.id === id)
    setName(selectedItem.title)
    setEditID(selectedItem.id)
    setIsEdit(true)
  }

  function deleteItem(id) {
    setList((prevList) => prevList.filter((item) => item.id !== id))
  }

  function clearList() {
    setList([])
  }

  React.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return (
    <div className="container">
      <h2 className="center">Grocery</h2>
      <input
        type="text"
        className="input"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="e.g: Apple"
      />
      <button className="add-btn" onClick={handleClick}>
        {isEdit ? "Edit" : "Add Item"}
      </button>

      <Item list={list} editItem={editItem} deleteItem={deleteItem} />
      {list.length > 0 && (
        <button className="clear-list" onClick={clearList}>
          Clear List
        </button>
      )}
    </div>
  )
}
