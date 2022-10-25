import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Todo = () => {
  const [input, setInput] = useState("");
  const [todoArr, setTodoArr] = useState([]);

  const onTodoAddHandler = () => {
    if (!input) return;
    setTodoArr([
      ...todoArr,
      {
        id: uuidv4().split("-")[0],
        text: input
      }
    ]);
    
    setInput("");
  };
  
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
        <button
          className="btn btn-primary h-50 align-self-end ms-2"
          onClick={() => onTodoAddHandler()}
        >
          Add
        </button>
      </div>
      <div className="container">
        {todoArr.map((todo, index) => (
          <ul style={{ listStyle: "none" }} className="row mt-3">
            <li className="col-6 text-center fs-4 ms-5">{todo.text}</li>
            <button className="col-auto btn btn-secondary me-2">Edit</button>
            <button className="col-auto btn btn-danger h-75">Delete</button>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Todo;
