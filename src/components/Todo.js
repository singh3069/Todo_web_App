import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import classes from "./todo.module.css";

function Todo() {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState(savedTodos || []);
  const [editTodo, setEditTodo] = useState({
    id: undefined,
    text: undefined,
  });
  const [newTodoText, setNewTodoText] = useState("");

  /**
   * adding todo through input field
   */
  const addTodoHandler = () => {
    if (newTodoText) {
      setTodos([...todos, { id: uuidv4(), text: newTodoText }]);
      setNewTodoText("");
    } else {
      alert("Input field can't be empty");
    }
  };

  /**
   * editing todo on key press.
   */
  const editingTodoOnEnterKeypress = (e) => {
    if (e.key === "Enter") {
      const arr = todos.map((todo) =>
        todo.id === editTodo.id ? { ...todo, text: editTodo.text } : todo
      );
      if (editTodo.text === "") {
        alert("Input field can't be empty");
      } else {
        setTodos(arr);
        setEditTodo({ id: undefined, text: undefined });
      }
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
   * editing todo.
   */
  const editTodoHanlder = (task) => {
    setEditTodo(task);
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
          onKeyPress={addingTodoOnEnterKeypress}
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
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
            return editTodo.id === task.id ? (
              <li className={classes.list} key={task.id}>
                <input
                  className={classes.input}
                  onKeyPress={editingTodoOnEnterKeypress}
                  value={editTodo.text}
                  onChange={(e) =>
                    setEditTodo((prev) => ({
                      ...prev,
                      text: e.target.value,
                    }))
                  }
                />
                <button>Save</button>
                <button>Cancel</button>
              </li>
            ) : (
              <li className={classes.list} key={task.id}>
                <p className={classes.todoPara}>{task.text}</p>
                <div>
                  <span
                    id={task.id}
                    className={classes.deleteBttn}
                    onClick={removeTodoHandler}
                  >
                    🗑
                  </span>
                  <span
                    className={classes.editBttn}
                    onClick={() => editTodoHanlder(task)}
                  >
                    ✏
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Todo;
