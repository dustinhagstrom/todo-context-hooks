import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodoInputContext, TodoContext } from "./context/context";

import TodoInput from "./components/Todo/TodoInput";
import Todo from "./components/Todo/Todo";

import "./App.css";

let tempTodoDataArray = [
  {
    id: uuidv4(),
    todo: "walk the dog",
  },
  {
    id: uuidv4(),
    todo: "walk the cat",
  },
  {
    id: uuidv4(),
    todo: "walk the hamster",
  },
];

function App() {
  const [todoArray, setTodoArray] = useState(tempTodoDataArray);

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

  function showTodoInput() {
    return (
      <TodoInputContext.Provider value={{ addTodo }}>
        <TodoInput />;
      </TodoInputContext.Provider>
    );
  }

  function showTodo() {
    return todoArray.map((item) => {
      return (
        <TodoContext.Provider key={item.id} value={{ todoItem: item }}>
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
