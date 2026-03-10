import { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import 'animate.css';
function Edittodo() {

  const { id } = useParams();

  const [todoData, setTodoData] = useState({
    todoItems: "",
    priority: "High",
    emoji: "🌄",
  });

  const [emojiPicker, setEmojiPicker] = useState(false);

  // Load Todo
  const loadTodo = async () => {
    if (!id) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/todos/${id}`
      );

      const todoDetails = response.data.data;

      setTodoData({
        todoItems: todoDetails.todoItems,
        priority: todoDetails.priority,
        emoji: todoDetails.emoji,
      });

    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };

  useEffect(() => {
    loadTodo();
  }, [id]);


  // Update Todo
  const updateTodo = async () => {
    try {

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/todos/${id}`,
        todoData
      );

      if (response) {
        // alert(response.data.message);
      Swal.fire({
  title: response.data.message,
  showClass: {
    popup: `animate__animated animate__rotateOutDownLeft`
  },
  hideClass: {
    popup: `animate__animated animate__rotateOutDownLeft`
  },
  didOpen: (popup) => {
    popup.style.setProperty('--animate-duration', '5s');
  }
});

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }

    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };


  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-6">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-5">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          ✏️ Edit Todo : {id}
        </h1>

        {/* Todo Input */}
        <input
          type="text"
          value={todoData.todoItems}
          onChange={(e) =>
            setTodoData({ ...todoData, todoItems: e.target.value })
          }
          placeholder="Enter todo task..."
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Priority Select */}
        <select
          value={todoData.priority}
          onChange={(e) =>
            setTodoData({ ...todoData, priority: e.target.value })
          }
          className="w-full border p-3 rounded-xl"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Emoji Button */}
        <button
          onClick={() => setEmojiPicker(!emojiPicker)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Select Emoji {todoData.emoji}
        </button>

        {/* Emoji Picker */}
        {emojiPicker && (
          <EmojiPicker
            onEmojiClick={(emoji) => {
              setTodoData({ ...todoData, emoji: emoji.emoji });
              setEmojiPicker(false);
            }}
          />
        )}

        {/* Update Button */}
        <button
          className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition"
          onClick={updateTodo}
        >
          Update Todo
        </button>

      </div>

    </div>
  );
}

export default Edittodo;