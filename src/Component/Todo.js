import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Todo = () => {
  const [input, setInput] = useState("");
  const [todoArr, setTodoArr] = useState(() => {
    const todoFromLC = JSON.parse(localStorage.getItem("todo"));
    return todoFromLC && todoFromLC.length > 0 ? todoFromLC : [];
  });
  const [isEditing, setIsEditing] = useState({
    edit: false,
    todoId: "",
  });

  const onTodoAddHandler = () => {
    if (!input) return;
    setTodoArr([
      {
        id: uuidv4().split("-")[0],
        text: input,
        isCompleted: false,
      },
      ...todoArr,
    ]);

    setInput("");
  };

  const onHandleDelete = (id) => {
    const updatedArr = todoArr.filter((todo) => todo.id !== id);
    setTodoArr(updatedArr);
  };

  const onEditHandler = (text, id) => {
    setIsEditing({ ...isEditing, edit: true, todoId: id });
    setInput(text);
  };
  const onTodoUpdateHandler = () => {
    const todoIndex = todoArr.findIndex((elem) => elem.id === isEditing.todoId);
    const clonedArr = [...todoArr];
    clonedArr[todoIndex] = {
      id: uuidv4().split("-")[0],
      text: input,
    };
    setTodoArr(clonedArr);
    setInput("");
    setIsEditing({ ...isEditing, edit: false, todoId: "" });
  };
  const onCompleteHandler = (id) => {
    const todoIndex = todoArr.findIndex((elem) => elem.id === id);
    const clonedArr = [...todoArr];
    clonedArr[todoIndex] = {
      ...clonedArr[todoIndex],
      isCompleted: !clonedArr[todoIndex].isCompleted,
    };
    setTodoArr(clonedArr);
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoArr));
  }, [todoArr]);

  return (
    <div className="container text-center">
      <h1 className="m-5">Todo App</h1>
      <div className="d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50 mt-4"
          placeholder="Add Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {isEditing.edit ? (
          <button
            className="btn btn-warning h-50 align-self-end ms-2"
            onClick={() => onTodoUpdateHandler()}
          >
            Update
          </button>
        ) : (
          <button
            className="btn btn-primary h-50 align-self-end ms-2"
            onClick={() => onTodoAddHandler()}
          >
            Add
          </button>
        )}
      </div>
      <div className="container">
        {todoArr.map((todo, index) => (
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
            <li className="col-3 text-center fs-4 align-items-center">
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
        ))}
      </div>
    </div>
  );
};

export default Todo;
