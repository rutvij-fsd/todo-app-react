import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItemDetail from "./TodoItemDetail";
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
  const [filter, setfilter] = useState("All");

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

  const getAllTodos = () =>{
    return todoArr.map((todo, index) => (
      <TodoItemDetail 
      key={index}
      todo={todo} 
      onCompleteHandler={onCompleteHandler} 
      onEditHandler={onEditHandler}
      onHandleDelete={onHandleDelete}
      />
    ))
  }
  const getCompletedTodos = () =>{
    return todoArr.map((todo, index) => 
      todo.isCompleted && (<TodoItemDetail 
      key={index}
      todo={todo} 
      onCompleteHandler={onCompleteHandler} 
      onEditHandler={onEditHandler}
      onHandleDelete={onHandleDelete}
      />)
    )
  }
  const getPendingTodos = () =>{
    return todoArr.map((todo, index) => 
      !todo.isCompleted && (<TodoItemDetail 
      key={index}
      todo={todo} 
      onCompleteHandler={onCompleteHandler} 
      onEditHandler={onEditHandler}
      onHandleDelete={onHandleDelete}
      />)
    )
  }

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
      <div className="d-flex justify-content-center mt-3">
        <button
          className={`${filter === "All" ? "btn-info" : ""} btn mx-2 px-4`}
          onClick={() => setfilter("All")}
        >
          All
        </button>
        <button
          className={`${
            filter === "Completed" ? "btn-info" : ""
          } btn mx-2 px-4`}
          onClick={() => setfilter("Completed")}
        >
          Completed
        </button>
        <button
          className={`${filter === "Pending" ? "btn-info" : ""} btn mx-2 px-4`}
          onClick={() => setfilter("Pending")}
        >
          Pending
        </button>
      </div>
      <div className="container">{filter === 'All' && getAllTodos()}</div>
      <div className="container">{filter === 'Completed' && getCompletedTodos()}</div>
      <div className="container">{filter === 'Pending' && getPendingTodos()}</div>
    </div>
  );
};

export default Todo;
