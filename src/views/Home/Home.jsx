import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
  const [todos, setTodos] = useState([]);

  {/*Load Todos from Backend 
      axio is a library for making HTTP requests in the browser.    
    */} 

  const loadTodos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);

      setTodos(response.data.data);

    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  useEffect(() => {
    loadTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`);
      if(response){
        alert(response.data.message);
        loadTodos();
      }
    }catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

const markdone = async (id, isDone) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/todos/${id}/status`,
      { isDone:isDone }
    );

    if (response) {
      alert(response.data.message);
      loadTodos();
    }
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};
 return (
  <div className="min-h-screen bg-slate-100 p-4 md:p-10">

    {/* Header */}
    <div className="mb-8 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
        🎯 Task Board
      </h1>
      <p className="text-gray-500 mt-2">
        Manage your daily tasks smartly
      </p>
    </div>

    {/* Todo List Container */}
    <div className="max-w-3xl mx-auto space-y-5 relative">

      {todos.map((todo) => (
        <div
          key={todo.id}
          className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex"
        >

          <div className={`w-3 ${
            todo.priority === "high"
              ? "bg-red-500"
              : todo.priority === "medium"
              ? "bg-orange-400"
              : "bg-green-500"
          }`} />
          <div className="flex items-center gap-3 pl-4">
          <input type="checkbox" checked={todo.isDone}
              onChange={(e)=>{markdone(todo.id,e.target.checked);}}
              className="w-5 h-5 cursor-pointer"/>
            <div className="flex items-center justify-center px-5 text-3xl">
            {todo.emoji}
          </div>
          </div>
          <div className="py-4 pr-6 flex-1 min-w-0">
            <p className={`text-lg font-semibold break-words ${
              todo.isDone ? "line-through text-gray-400" : "text-slate-800"
            }`}>
              {todo.todoItems}
            </p>

            <div className="flex flex-wrap gap-3 mt-3 items-center">
              <span className={`text-xs font-semibold px-3 py-1 rounded-lg ${
                todo.priority === "high"
                  ? "bg-red-100 text-red-600"
                  : todo.priority === "medium"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-green-100 text-green-600"
              }`}>
                {todo.priority} priority
              </span>

              <span className="text-xs text-gray-400">
                📅 {todo.createdAt?.replace("T", " ")?.slice(0, 16)}
              </span>
            </div>
          </div>
          <button onClick={() => deleteTodo(todo.id)}
          className="bg-red-600 text-white px-2 py-1 rounded-xl shadow-md hover:bg-red-700 transition flex items-center gap-2 font-semibold ml-auto mr-2 h-8 "> 🗑 Delete</button>
        </div>
      ))}

      






      {/* Floating Add Todo Button */}
      <Link
        to="/new"
        className="fixed bottom-8 right-8 bg-indigo-600 text-white
        px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700
        transition flex items-center gap-2 font-semibold"
      >
        ➕ New Todo
      </Link>

    </div>
  </div>
);
}
export default Home