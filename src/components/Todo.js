import React, { useState, createRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import classes from "./todo.module.css";

function Todo() {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState(savedTodos || []);
  const textInput = createRef();

  /**
   * adding todo through input field
   */
  const addTodoHandler = () => {
    if (textInput.current.value === "") {
      alert("Input field can't be empty");
    } else {
      setTodos([...todos, { id: uuidv4(), text: textInput.current.value }]);
    }
  };

  /**
   *
   * adding todo on key enter press
   */
  const addingTodoOnEnterKeypress = (e) => {
    console.log(e.keycode);
    if (e.keyCode === 13) {
      addTodoHandler();
    }
  };

  /**
   * removing todos
   */

  const removeTodoHandler = (item) => {
    const liToBeDel = item.target.id;
    const newTodo = todos.filter((task) => {
      return task.id !== liToBeDel;
    });
    setTodos(newTodo);
  };

  /**
   * checking if the user has completed the todo or not.
   */
  const completedTodoHandler = () => {};

  /**
   * editing todo.
   */
  const editTodoHanlder = () => {};

  /**
   * storing todos to local storage
   */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /**
   *  getting todos from local storage
   */
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      setTodos(todos);
    }
  }, []);

  return (
    <div>
      <div className={classes.inputBttnDiv}>
        <h1 className={classes.heading}>
          <u>Todo App</u>
        </h1>

        <input
          className={classes.input}
          ref={textInput}
          onKeyPress={addingTodoOnEnterKeypress}
        />
        <br />
        <br />
        <button
          className={classes.addTodoBttn}
          onClick={() => addTodoHandler()}
        >
          Add Todo
        </button>
        <br />
      </div>
      <div className={classes.todoListDiv}>
        <ol className={classes.orderList}>
          {todos.map((task, element) => {
            return (
              <li className={classes.list} key={task.id}>
                {task.text}
                <span
                  className={classes.checked}
                  onClick={completedTodoHandler}
                >
                  ✔
                </span>
                <span
                  id={task.id}
                  className={classes.deleteBttn}
                  onClick={(e) => removeTodoHandler(e)}
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
