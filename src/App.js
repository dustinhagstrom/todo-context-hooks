import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodoInputContext, TodoContext } from "./context/context";

import TodoInput from "./components/Todo/TodoInput";
import Todo from "./components/Todo/Todo";

import "./App.css";

// let tempTodoDataArray = [
//   {
//     id: uuidv4(),
//     todo: "walk the dog",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     todo: "walk the cat",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     todo: "walk the hamster",
//     isCompleted: false,
//   },
// ];

function App() {
  let initialTodosArray = window.localStorage.getItem("todos")
    ? JSON.parse(window.localStorage.getItem("todos"))
    : [];

  const [todoArray, setTodoArray] = useState(initialTodosArray); //initial state is temptododataarray.
  function addTodo(todo) {
    let newAddedTodoArray = [
      ...todoArray,
      {
        id: uuidv4(),
        todo,
        isCompleted: false,
      },
    ];

    setTodoArray(newAddedTodoArray);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoArray));
  }, [todoArray]);

  function showTodoInput() {
    return (
      <TodoInputContext.Provider value={{ addTodo }}>
        <TodoInput />
      </TodoInputContext.Provider>
    );
  }

  function handleDone(index) {
    let newArray = [...todoArray];

    newArray[index].isCompleted = !newArray[index].isCompleted;
    // localStorage.setItem("todos", JSON.stringify(newArray));
    setTodoArray(newArray);
  }

  function handleDelete(index) {
    // let newArray = [...todoArray];
    //same thing as spread operator
    let newArray = Object.assign([], todoArray);

    newArray.splice(index, 1);
    // localStorage.setItem("todos", JSON.stringify(newArray));
    setTodoArray(newArray);
  }
  // function handleDoneById(id) {
  //   let resultArray = todoArray.map((item) => {
  //     if (item.id === id) {
  //       item.isCompleted = !item.isCompleted;
  //     }
  //     return item;
  //   });

  //   setTodoArray(resultArray);
  // }

  function showTodo() {
    // let newArray = JSON.parse(localStorage.getItem("todos"));
    return todoArray.map((item, index) => {
      return (
        <TodoContext.Provider
          key={item.id}
          value={{
            todoItem: item,
            index,
            handleDone,
            handleDelete,
            //  handleDoneById
          }}
        >
          <Todo key={item.id} />
        </TodoContext.Provider>
      );
    });
  }

  return (
    <div className="App">
      {showTodoInput()}
      {showTodo()}
    </div>
  );
}

export default App;
