import React, { useState } from "react";
import classes from "./todo.module.css";

function Todo() {
  const [todos, setTodos] = useState([
    { Task: "Do Your Home Work" },
    { Task: "Learn new thing" },
    { Task: "Learn new thing" },
    { Task: "Learn new thing" },
    { Task: "Learn new thing" },
    { Task: "Learn new thing" },
    { Task: "Learn new thing" },
  ]);
  return (
    <div>
      <div className={classes.inputBttnDiv}>
        <h1 className={classes.heading}>
          <u>Todo App</u>
        </h1>

        <input className={classes.input} />
        <br />
        <br />
        <button className={classes.addTodoBttn}>Add Todo</button>
        <br />
        {/* <small>*Let's start your day by making Todo's .</small> */}
      </div>
      <div className={classes.todoListDiv}>
        <ol className={classes.orderList}>
          {todos.map((index) => {
            return (
              <li className={classes.list}>
                {index.Task} <span className={classes.deleteBttn}>🗑</span>
                <span className={classes.editBttn}>✏</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Todo;
