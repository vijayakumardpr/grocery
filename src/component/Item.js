import React from "react"
import { FaTrash, FaEdit } from "react-icons/fa"

export default function Item({ list, editItem, deleteItem }) {
  const lists = list.map((item) => (
    <div className="list-container" key={item.id}>
      {item.title}
      <div className="btn-container">
        <button className="btn edit" onClick={() => editItem(item.id)}>
          <FaEdit />
        </button>
        <button className="btn delete" onClick={() => deleteItem(item.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  ))
  return <div>{lists}</div>
}
