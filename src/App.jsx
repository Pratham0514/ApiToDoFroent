import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  {/*Load Todos from Backend 
      axio is a library for making HTTP requests in the browser.    
    */} 

  const loadTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/todos");

      setTodos(response.data.data);

    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-3xl font-bold underline">
        TODOS
      </h1>
                {/*------------------ Display Todos------------------------------- */}
      <ul className="mt-4 space-y-3 w-1/2 mx-auto">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-3 p-3 bg-white shadow rounded-lg border hover:bg-gray-100 transition" >
            {/* Emoji */}
            <span className="text-3xl ml-2 pr-2">
                 {todo.emoji}
            </span>
            <div>
              {/* Todo Item */}
              <p className={`font-semibold ${ todo.isDone  ? "line-through text-gray-400" : "" }`} >
                {todo.todoItems}
              </p>
              {/* Priority Color */}
              <p className={`text-sm font-semibold capitalize 
              ${ todo.priority === "high" ? "text-red-500" : todo.priority === "medium" ? "text-orange-500" : "text-green-500" }`} >
                Priority: {todo.priority}
              </p>
              {/* Created Date (Safe Rendering) */}
              <p className="text-sm text-gray-500 capitalize">
                CreatedAt:{todo.createdAt ?.replace("T", " ") ?.slice(0, 16)}
              </p>
            </div>
          </li>
        ))}
      </ul>





    </div>
  );
}

export default App;