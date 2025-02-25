import emptyIcon from "./assets/icons/empty-icon.svg";
import finishedIcon from "./assets/icons/done-icon.svg";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./assets/styles/global.scss";

interface TodoType {
  id: string;
  text: string;
  isCompleted: boolean;
}

function App() {
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addTask = () => {
    if (!inputValue.trim()) return;
    const newTodo: TodoType = {
      id: uuidv4(),
      text: inputValue,
      isCompleted: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
  };
  const changeStatus = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  let timeoutId: ReturnType<typeof setTimeout>;

  const handleMouseEnter = (e: React.MouseEvent, text: string) => {
    timeoutId = setTimeout(() => {
      setTooltip({ text, x: e.clientX + 10, y: e.clientY + 10 });
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setTooltip(null);
  };

  return (
    <div className="todo-lists-wrapper">
      <div className="todo-lists-header">TODOS</div>
      <section className="create-todo">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask} aria-label="Add task">
          +
        </button>
      </section>
      <section className="todos-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo ${todo.isCompleted ? "completed" : ""}`}
            >
              <div
                className="todo-status"
                onClick={() => changeStatus(todo.id)}
              >
                <button className="finish btn">
                  <img
                    src={todo.isCompleted ? finishedIcon : emptyIcon}
                    alt="Task status"
                  />
                </button>
              </div>
              <div
                className="todo-text"
                onMouseEnter={(e) => handleMouseEnter(e, todo.text)}
                onMouseLeave={handleMouseLeave}
              >
                {todo.text}
              </div>
            </div>
          ))
        ) : (
          <p className="no-todo">No Todos yet</p>
        )}
      </section>
      <section className="todo-lists-info">
        <div className="total-todo">{todos.length} todos left</div>
      </section>
      {tooltip && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            top: tooltip.y,
            left: tooltip.x,
            background: "#333",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "14px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

export default App;
