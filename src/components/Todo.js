import React, { useState, createRef } from "react";
import classes from "./todo.module.css";

function Todo() {
  const [todos, setTodos] = useState([
    // "Do Your Hindi Home Work",
    // "Do Your Physics Home Work",
  ]);
  const textInput = createRef();

  const addTodoHandler = () => {
    setTodos([...todos, textInput.current.value]);
    // console.log(textInput.current.value);
  };

  const removeTodoHandler = () => {};

  const completedTodoHandler = () => {};

  const editTodoHanlder = () => {};

  return (
    <div>
      <div className={classes.inputBttnDiv}>
        <h1 className={classes.heading}>
          <u>Todo App</u>
        </h1>

        <input className={classes.input} ref={textInput} />
        <br />
        <br />
        <button
          className={classes.addTodoBttn}
          onClick={() => addTodoHandler()}
        >
          Add Todo
        </button>
        <br />

        {/* <small>*Let's start your day by making Todo's .</small> */}
      </div>
      <div className={classes.todoListDiv}>
        <ol className={classes.orderList}>
          {todos.map((index) => {
            return (
              <li className={classes.list}>
                {index}
                <span
                  className={classes.checked}
                  onClick={completedTodoHandler}
                >
                  ✔
                </span>
                <span
                  className={classes.deleteBttn}
                  onClick={removeTodoHandler}
                >
                  🗑
                </span>
                <span className={classes.editBttn} onClick={editTodoHanlder}>
                  ✏
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Todo;
