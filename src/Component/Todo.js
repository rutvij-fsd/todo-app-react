import React, { useState } from "react";

const Todo = () => {
  const [input, setInput] = useState("");
  console.log('input', input);

  const onTodoAddHandler = () => {
    console.log('add Todo');
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
    </div>
  );
};

export default Todo;
