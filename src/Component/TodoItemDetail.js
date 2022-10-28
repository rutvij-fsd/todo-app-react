import React from 'react'

const TodoItemDetail = ({todo , onCompleteHandler, onEditHandler, onHandleDelete}) => {
  return (
    <ul
            style={{ listStyle: "none" }}
            className="row mt-3 justify-content-center mx-5"
          >
            <span
              className="col-auto"
              onClick={() => onCompleteHandler(todo.id)}
            >
              {!todo.isCompleted ? (
                <i className="fa-solid fa-stopwatch fa-2x center"></i>
              ) : (
                <i className="fa-solid fa-circle-check fa-2x center"></i>
              )}
            </span>
            <li className="col-5 text-center fs-4 align-items-center">
              {todo.text}
            </li>
            <button
              className="col-auto btn btn-secondary h-auto me-2"
              onClick={() => onEditHandler(todo.text, todo.id)}
            >
              Edit
            </button>
            <button
              className="col-auto btn btn-danger h-auto"
              onClick={() => onHandleDelete(todo.id)}
            >
              Delete
            </button>
          </ul>
  )
}

export default TodoItemDetail