import React, { useState, createRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import classes from "./todo.module.css";

function Todo() {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState(savedTodos || []);
  const [editTodo, setEditTodo] = useState();
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
    if (e.key === "Enter") {
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
   * editing todo on key press.
   */
  const editingTodoOnEnterKeypress = (e) => {
    if (e.key === "Enter") {
      addTodoHandler();
    }
  };

  /**
   * editing todo.
   */
  const editTodoHanlder = (task) => {
    const editTask = task.target.id;
    setEditTodo(editTask);
  };

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
          {todos.map((task) => {
            return editTodo === task.id ? (
              <input
                key={task.id}
                className={classes.input}
                onKeyPress={editingTodoOnEnterKeypress}
              />
            ) : (
              <li className={classes.list} key={task.id}>
                {task.text}
                <span
                  className={classes.checked}
                  // onClick={completedTodoHandler}
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
                <span
                  className={classes.editBttn}
                  onClick={editTodoHanlder}
                  id={task.id}
                >
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
